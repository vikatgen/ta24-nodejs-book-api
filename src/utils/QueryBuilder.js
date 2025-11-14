export const QueryBuilder = (query, model) => {
    const { page, take, sort, sort_direction, search, search_fields, include } = query;

    const prismaQuery = {};

    prismaQuery.skip = (page - 1) * take;
    prismaQuery.take = take;

    if (sort) {
        prismaQuery.orderBy = {
            [sort]: sort_direction,
        }
    }

    if (search && search_fields.length > 0) {
        prismaQuery.where = {
            OR: search_fields.map(field => ({
                [field]: {
                    contains: search
                },
            }))
        }
    }

    if (Array.isArray(include) && include) {
        prismaQuery.include = {};

        include.forEach(relation => {
            if (relation === 'authors') {
                prismaQuery.include.authors = {
                    include: {
                        author: true
                    }
                }
            }
        })
    }

    return prismaQuery;
};


export const buildPaginationMeta = async (model, query, totalCount) => {
    const { take, page } = query;
    const totalPages = Math.ceil(totalCount / take);

    return {
        current_page: page,
        per_page: take,
        total_pages: totalPages,
        total: totalCount,
        has_next_page: page < totalPages,
        has_previous_page: page > 1
    }
}