class AuthorRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    async findAll(QueryParams) {
        return this.prisma.author.findMany(QueryParams);
    }

    async count(QueryParams) {
        return this.prisma.author.count({ where: QueryParams.where });
    }

    async getAuthorById(id) {
        return this.prisma.author.findUnique({ where: { id: Number(id) } });
    }

    async createAuthor(author) {
        return this.prisma.author.create({ data: author });
    }

    async updateAuthor(id, author) {
        return this.prisma.author.update({ where: { id: Number(id) }, data: author });
    }

    async deleteAuthor(id) {
        return this.prisma.author.delete({ where: { id: Number(id) }});
    }
}

export default AuthorRepository;