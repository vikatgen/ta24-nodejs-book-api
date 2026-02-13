class CategoryRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(queryBuilder) {
        return this.prisma.category.findMany(queryBuilder);
    }

    async count(queryBuilder) {
        return this.prisma.category.count({ where: queryBuilder.where});
    }

    async create(name) {
        return this.prisma.category.create( { data: { name } });
    }

    async update(id, name) {
        return this.prisma.category.update(
            {
                where: { id },
                data: { name }
            }
        );
    }

    async destroy(id) {
        return this.prisma.category.delete( { where: { id } } );
    }
}

export default CategoryRepository;