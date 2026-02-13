class CategoryController {

    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    async index(request, response, next) {
        try {
            const { categories, meta } = await this.categoryService.getCategory(request.query);
            response.status(200).json({
                message: 'All categories',
                data: categories,
                meta
            });
        } catch (exception) {
            next(exception);
        }
    }

    async create(request, response, next) {
        try {
            const { name } = request.body;
            const createdEntity = await this.categoryService.createCategory(name);

            response.status(201).json({
                message: 'Category created',
                data: { ...createdEntity }
            })
        } catch(exception) {
            next(exception);
        }
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const { name } = request.body;

            const updatedEntity = await this.categoryService.updateCategory(id, name);
            response.status(200).json({
                message: 'Category updated',
                data: { ...updatedEntity }
            })
        } catch (exception) {
            next(exception);
        }
    }

    async destroy(request, response, next) {
        try {
            const { id } = request.params;
            await this.categoryService.deleteCategory(Number(id));

            response.status(204).json({
                message: 'Category deleted',
            })
        } catch (exception) {
            next(exception);
        }
    }
}

export default CategoryController;

// TODO: @vikatgen uuri, mis värk on
/*export default new CategoryController(new CategoryService(CategoryRepository));*/