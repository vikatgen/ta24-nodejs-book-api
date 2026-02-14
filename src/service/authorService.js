import {QueryBuilder} from "../utils/QueryBuilder.js";
import NotFoundError from "../utils/NotFoundError.js";

class AuthorService {

    constructor(repository) {
        this.repository = repository;
    }

    async getAuthors(QueryParams){
        const Builder = new QueryBuilder(QueryParams, {
            defaultSort: 'created_at',
            defaultTake: 10,
            allowedSorts: ['created_at', 'name'],
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true }}
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [authors, count] = await Promise.all([
            this.repository.findAll(prismaQuery),
            this.repository.count(prismaQuery)
        ]);

        const meta = Builder.getPaginationMeta(count);

        return { authors, meta };
    }

    async getAuthorById(id){
        const book = await this.repository.author.getAuthorById(id);
        if (!book) throw new NotFoundError(`Author with id ${id} not found`);

        return book;
    }

    async createAuthor(author){
        return this.repository.createAuthor({...author});
    }

    async updateAuthor(authorId, author){
        const response = this.repository.updateAuthor(authorId, {...author});
        if(!response) throw new NotFoundError(`Author with id ${authorId} not found`);

        return response;
    }

    async deleteAuthor(authorId){
        return this.repository.deleteAuthor(authorId);
    }
}

export default AuthorService;