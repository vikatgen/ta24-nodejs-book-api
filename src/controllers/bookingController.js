class BookingController {

    constructor(bookingService) {
        this.bookingService = bookingService;
    }

    async index(request, response, next) {
        try {
            const { bookings, meta } = await this.bookingService.getBookings(
                request.user?.id,
                request.query
            );
            response.status(200).json({ bookings, meta });
        } catch (exception) {
            next(exception);
        }
    }

    async show(request, response, next) {
        try {
            const booking = await this.bookingService.getBookingById(
                request.params.id,
                request.user?.id
            );
            response.status(200).json(booking);
        } catch (exception) {
            next(exception);
        }
    }

    async create(request, response, next) {
        try {
            const booking = await this.bookingService.createBooking(
                request.user?.id,
                request.body?.book_id,
                request.body?.return_date
            );
            response.status(201).json(booking);
        } catch (exception) {
            next(exception);
        }
    }

    async return(request, response, next) {
        try {
            const booking = await this.bookingService.returnBook(
                request.params?.id,
                request.user?.id
            );

            response.status(200).json(booking);
        } catch (exception) {
            next(exception);
        }
    }

    async cancel(request, response, next) {
        try {
            await this.bookingService.cancelBooking(
                request.params?.id,
                request.user?.id
            );
            response.sendStatus(204);
        } catch (exception) {
            next(exception);
        }
    }
}

export default BookingController;