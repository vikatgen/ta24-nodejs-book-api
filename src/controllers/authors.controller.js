class AuthorController {

    constructor(authorService) {
        this.authorService = authorService;
    }

    async index(request, response, next) {
        try {
            const { authors, meta} = await this.authorService.getAuthors(request.query);
            response.status(200).json({
                authors,
                meta
            });
        } catch (exception) {
            next(exception);
        }
    }

    async edit(request, response, next) {
        try {
            const author = await this.authorService.getAuthorById(request.params.id);
            response.status(200).json(author);
        } catch (exception) {
            next(exception);
        }
    }

    async create(request, response, next) {
        try {
            await this.authorService.createAuthor(request.body);
            response.sendStatus(201);
        } catch (exception) {
            next(exception);
        }
    }

    async update(request, response, next) {
        try {
            await this.authorService.updateAuthor(request.params.id, request.body);
            response.sendStatus(200);
        } catch (exception) {
            next(exception);
        }
    }

    async delete(request, response, next) {
        try {
            await this.authorService.deleteAuthor(request.params.id);
            response.sendStatus(204);
        } catch (exception) {
            next(exception);
        }
    }
}

export default AuthorController;