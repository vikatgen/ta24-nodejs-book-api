import {QueryBuilder} from "../utils/QueryBuilder.js";
import NotFoundError from "../utils/NotFoundError.js";

class BookService {

    constructor(repository) {
        this.repository = repository;
    }

    async getBooks(queryParams){
        const Builder = new QueryBuilder(queryParams, {
            defaultSort: 'created_at',
            defaultTake: 20,
            allowedSorts: ['id', 'title', 'description', 'created_at', 'updated_at'],
            allowedSearchFields: ['title', 'description'],
            allowedIncludes: {
                'authors': { include: { author: true }}
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [books, count] = await Promise.all([
            this.repository.getAll(prismaQuery),
            this.repository.count(prismaQuery)
        ]);

        const meta = Builder.getPaginationMeta(count);

        return { books, meta };
    }

    async getBookById(id) {
        const book = await this.repository.findById(id);
        if(!book) throw new NotFoundError(`Book with id ${id} not found`);

        return book;
    }

    async createBook(book) {
        return this.repository.create({ ... book });
    }

    async updateBook(bookId, book) {
        return this.repository.update(Number(bookId), { ...book });
    }

    async deleteBook(bookId) {
        return this.repository.destroy(bookId);
    }
}

export default BookService;