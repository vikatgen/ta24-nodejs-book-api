import {QueryBuilder} from "../utils/QueryBuilder.js";
import NotFoundError from "../utils/NotFoundError.js";
import AppError from "../utils/AppError.js";

function computeBookStatus(stock) {
    if (stock <= 0) return "OUT_OF_STOCK";
    if (stock <= 3) return "LOW_STOCK";
    return "AVAILABLE";
}

class BookingService {

    constructor(repository, prisma) {
        this.repository = repository;
        this.prisma = prisma;
    }

    async getBookings(userId, queryParams) {
        const Builder = new QueryBuilder(queryParams, {
           defaultSort: 'created_at',
           defaultTake: 20,
           allowedSorts: ['id', 'created_at', 'return_date'],
           allowedIncludes: {
               'book': { include: { book: true }}
           }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [bookings, count] = await Promise.all([
            this.repository.findAllByUser(userId, prismaQuery),
            this.repository.countByUser(userId, prismaQuery)
        ]);

        const meta = Builder.getPaginationMeta(count);

        return { bookings, meta };
    }

    async getBookingById(id, userId) {
        const booking = await this.repository.findById(id);
        if(!booking) throw new NotFoundError("No booking found");
        if(booking.user_id !== userId) throw new NotFoundError("You are not authorized to view this booking");

        return booking;
    }

    async createBooking(userId, bookId, returnDate) {
        const MAX_DAYS_TO_RETURN = 30;
        const today = new Date();
        const returnDateObj = new Date(returnDate);

        const differenceInDays = Math.ceil((returnDateObj - today) / (1000 * 60 * 60 * 24));
        if(differenceInDays > MAX_DAYS_TO_RETURN) throw new AppError(`You can only return books up to ${MAX_DAYS_TO_RETURN} days in advance`, 400);
        if(differenceInDays < 1) throw new AppError("Return date cannot be in the past", 400);

        return this.prisma.$transaction(async (transaction) => {
            const book = await transaction.book.findUnique({ where: { id: Number(bookId) }});
            if(!book) throw new NotFoundError("Book not found");

            if(book.stock <= 0) throw new AppError("Book is out of stock", 400);

            const existingBooking = await transaction.booking.findFirst({
                where: {
                    user_id: userId,
                    book_id: bookId,
                    returned_at: null
                }
            });
            if(existingBooking) throw new AppError("You already have a booking for this book", 400);

            const newStock = book.stock - 1;
            await transaction.book.update({
                where: { id: Number(bookId) },
                data: {
                    stock: newStock,
                    status: computeBookStatus(newStock)
                }
            });

            return transaction.booking.create({
                data: {
                    user_id: userId,
                    book_id: bookId,
                    return_date: returnDateObj
                },
                include: { book: true }
            });
        })
    }

    async returnBook(bookingId, userId) {
        return this.prisma.$transaction(async (transaction) => {
            const booking = await transaction.booking.findUnique({
                where: { id: Number(bookingId) },
            });

            if(!booking) throw new NotFoundError("Booking not found");
            if(booking.user_id !== userId) throw new NotFoundError("You are not authorized to return this book");
            if(booking.returned_at) throw new AppError("This booking has already been returned", 400);

            const book = await transaction.book.findUnique({ where: { id: Number(booking.book_id)}});
            if(!book) throw new NotFoundError("Book not found");
            const newStock = book.stock + 1;

            await transaction.book.update({
                where: { id: Number(booking.book_id) },
                data: {
                    stock: newStock,
                    status: computeBookStatus(newStock)
                }
            });

            return transaction.booking.update({
                where: { id: Number(bookingId) },
                data: { returned_at: new Date() },
                include: { book: true }
            });
        });
    }

    async cancelBooking(bookingId, userId) {
        return this.prisma.$transaction(async (transaction) => {

            const booking = await transaction.booking.findUnique({
                where: { id: Number(bookingId) },
            });
            if(!booking) throw new NotFoundError("Booking not found");
            if(booking.user_id !== userId) throw new NotFoundError("You are not authorized to cancel this booking");

            if(!booking.returned_at) {
                const book = await transaction.book.findUnique({ where: { id: Number(booking.book_id)}});
                if(!book) throw new NotFoundError("Book not found");
                const newStock = book.stock + 1;

                await transaction.book.update({
                    where: { id: Number(booking.book_id) },
                    data: {
                        stock: newStock,
                        status: computeBookStatus(newStock)
                    }
                });
            }

            return transaction.booking.delete({
                where: { id: Number(bookingId) },
            })
        });
    }

}

export default BookingService;