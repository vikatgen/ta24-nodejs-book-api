class  BookRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(QueryParams) {
        return this.prisma.book.findMany(QueryParams);
    }

    async findById(id) {
        return this.prisma.book.findUnique({ where: { id: Number(id) } });
    }

    async count(QueryParams) {
        return this.prisma.book.count(QueryParams);
    }

    async create(book) {
        return this.prisma.book.create({ data: book });
    }

    async update(id, book) {
        return this.prisma.book.update( { where: { id }, data: book });
    }

    async destroy(id) {
        return this.prisma.book.delete({ where: { id: Number(id) }});
    }
}

export default BookRepository;