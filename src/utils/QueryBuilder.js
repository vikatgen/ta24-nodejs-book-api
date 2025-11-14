export class QueryBuilder {

    constructor(queryParams = {}, options = {}) {
        this.params = queryParams;
        this.options = {
            defaultPage: 1,
            defaultTake: 10,
            defaultSort: 'id',
            defaultSortDirection: 'asc',
            allowedSorts: ['id'],
            allowedIncludes: [],
            allowedSearchFields: [],
            ...options
        }
    };

    getPagination() {
        const page = Number(this.params.page) ?? this.options.defaultPage;
        const take = Number(this.params.take) ?? this.options.defaultTake;

        return {
            skip: (page - 1) * take,
            take
        }
    };

    getSorting() {
        const sort = this.params.sort ?? this.options.defaultSort;
        const direction = this.params.sort_direction ?? this.options.defaultSortDirection;

        if (!sort || !this.options.allowedSearchFields.includes(sort)) return null;

        return {
            [sort]: direction,
        }
    };

    getSearchFilter() {
        const search = this.params.search;
        let searchFields = this.params.search_fields;

        if (!search) return null;

        if(!searchFields || !Array.isArray(searchFields) || !searchFields.length) {
            searchFields = this.options.allowedSearchFields;
        } else {
            searchFields = searchFields.filter(field => this.options.allowedSearchFields.includes(field));
        }

        if (!searchFields.length) return null;

        return {
            OR: searchFields.map(field => ({
                [field]: {
                    contains: search
                }
            }))
        }
    };

    buildPrismaQuery() {
        const query = {};

        const pagination = this.getPagination();
        query.skip = pagination.skip;
        query.take = pagination.take;

        const sorting = this.getSorting();
        if (sorting) {
            query.orderBy = sorting;
        }

        const searchFilter = this.getSearchFilter();
        if (searchFilter) {
            query.where = searchFilter;
        }

        return query;
    }

    getPaginationMeta(count) {
        const page = Number(this.params.page) ?? this.options.defaultPage;
        const take = Number(this.params.take) ?? this.options.defaultTake;
        const total_pages = Math.ceil(count / take) ?? 1;

        return {
            current_page: page,
            per_page: take,
            total: count ?? 0,
            total_pages: total_pages ?? 0,
            has_next_page: page < total_pages,
            has_prev_page: page > 1,
        }

    }
}