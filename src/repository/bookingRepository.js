class BookingRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(QueryParams) {
        return this.prisma.booking.findMany(QueryParams);
    }

    async count(QueryParams) {
        return this.prisma.booking.count(QueryParams);
    }

    async findById(id) {
        return this.prisma.booking.findUnique({
            where: { id: Number(id) },
            include: { book: true }
        });
    }

    async findActiveByUserAndBook(userId, bookId) {
        return this.prisma.booking.findFirst({
            where: {
                user_id: Number(userId),
                book_id: Number(bookId),
                returned_at: null
            }
        })
    }

    async findAllByUser(userId, QueryParams){
        return this.prisma.booking.findMany({
            ...QueryParams,
            where: {
                ...QueryParams.where,
                user_id: Number(userId)
            }
        })
    }

    async countByUser(userId, QueryParams) {
        return this.prisma.booking.count({
            ...QueryParams,
            where: {
                ...QueryParams.where,
                user_id: Number(userId)
            }
        })
    }

    async create(booking) {
        return this.prisma.booking.create({ data: booking });
    }

    async update(bookingId, booking) {
        return this.prisma.booking.update({
            where: { id: Number(bookingId) },
            data: booking
        })
    }

    async destroy(bookingId) {
        return this.prisma.booking.delete({ where: { id: Number(bookingId) }});
    }
}

export default BookingRepository;