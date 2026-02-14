class BookController {

    constructor(bookService) {
        this.bookService = bookService;
    }

    async index(request, response, next) {
        try {
            const { books, meta } = await this.bookService.getBooks(request.query);
            response.status(200).json({
                books,
                meta
            });
        } catch (exception) {
            next(exception);
        }
    }

    async show(request, response, next) {
        try {
            const book = await this.bookService.getBookById(request.params.id);
            response.status(200).json(book);
        } catch (exception) {
            next(exception);
        }
    }

    async create(request, response, next) {
        try {
            await this.bookService.createBook(request.body);
            response.sendStatus(201);
        } catch (exception) {
            next(exception);
        }
    }

    async update(request, response, next) {
        try {
            await this.bookService.updateBook(request.params.id, request.body);
            response.sendStatus(200);
        } catch (exception) {
            next(exception);
        }
    }

    async delete(request, response, next) {
        try {
            await this.bookService.deleteBook(request.params.id);
            response.sendStatus(204);
        } catch (exception) {
            next(exception);
        }
    }
}

export default BookController;