
export const getAllBooks = (request, response) => {
    response.json({
        message: 'All books'
    })
};

export const getBookById = (request, response) => {
    response.json({
        id: request.params?.id
    })
};

export const createBook = (request, response) => {};

export const updateBook = (request, response) => {};

export const deleteBook = (request, response) => {};