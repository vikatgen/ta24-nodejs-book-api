class CategoryController {

    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    async index(request, response, next) {
        try {
            const { categories, meta } = await this.categoryService.getCategory(request.query);
            response.status(200).json({ categories, meta });
        } catch (exception) {
            next(exception);
        }
    }

    async create(request, response, next) {
        try {
            const { name } = request.body;
            await this.categoryService.createCategory(name);

            response.sendStatus(201);
        } catch(exception) {
            next(exception);
        }
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const { name } = request.body;
            await this.categoryService.updateCategory(id, name);

            response.sendStatus(200)
        } catch (exception) {
            next(exception);
        }
    }

    async destroy(request, response, next) {
        try {
            const { id } = request.params;
            await this.categoryService.deleteCategory(Number(id));

            response.sendStatus(204)
        } catch (exception) {
            next(exception);
        }
    }
}

export default CategoryController;