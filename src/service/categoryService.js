import NotFoundError from "../utils/NotFoundError.js";
import { QueryBuilder } from "../utils/QueryBuilder.js";

class CategoryService {

    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getCategory(queryParams){
        const Builder = new QueryBuilder(queryParams, {
            defaultSort: 'created_at',
            defaultTake: 50,
            allowedSearchFields: ['name'],
            allowedIncludes: {
                'books': { include: { book: true }}
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [categories, count] = await Promise.all([
            this.categoryRepository.getAll(prismaQuery),
            this.categoryRepository.count(prismaQuery)
        ]);

        const meta = Builder.getPaginationMeta(count);

        return { categories, meta };
    }

    async createCategory(name) {
        return this.categoryRepository.create(name);
    }

    async updateCategory(id, name) {
        return this.categoryRepository.update(id, name);
    }

    async deleteCategory(id) {
        if(!id) throw new NotFoundError("Category id is required");
        await this.categoryRepository.destroy(id);
    }
}

export default CategoryService;