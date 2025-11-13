import prisma from '../config/prisma.js';

export const getAllBooks = async (request, response) => {
    try {
        const books = await prisma.book.findMany();
        response.json({
            message: 'All books',
            data: books
        })
    } catch (exception) {
        console.log(exception);
        response.status(500).json({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getBookById = async (request, response) => {
    try {
        const idFromURL = request.params?.id;

        const book = await prisma.book.findUnique({
            where: {
                id: Number(idFromURL)
            }
        });

        if (!book) {
            response.status(404).json({
                message: 'Not Found'
            })
        }

        response.status(200).json({
            message: 'Successfully Found Book',
            data: book
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const createBook = async (request, response) => {
    try {
        const { title, description, thumbnail_url, release_year } = request.body;

        const newBook = await prisma.book.create({
            title,
            description,
            thumbnail_url,
            release_year,
        });

        response.status(201).json({
            message: 'Successfully Created Book',
            data: newBook
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateBook = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, description, thumbnail_url, release_year } = request.body;

        const updatedBook = await prisma.book.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
                thumbnail_url,
                release_year,
            }
        });

        if (!updatedBook) {
            response.status(404).json({
                message: 'Not Found'
            })
        }

        response.status(200).json({
            message: 'Successfully Updated Book',
            data: updatedBook
        })

    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteBook = async (request, response) => {
    try {
        const bookId = request.params?.id;

        await prisma.book.delete({
            where: {
                id: Number(bookId)
            }
        })

        response.status(200).json({
            message: 'Successfully Deleted',
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};