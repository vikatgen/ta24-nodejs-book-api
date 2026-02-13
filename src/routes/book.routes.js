import { Router } from 'express';
import { validateBody, validateQuery } from "../middlewares/validator.middleware.js";
import { bookSchema } from "../validations/book.validation.js";
import { bookQuerySchema } from "../validations/bookQuery.validation.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

import BookRepository from "../repository/bookRepository.js";
import BookService from "../service/bookService.js";
import BooksController from "../controllers/books.controller.js";

const repository = new BookRepository(prisma);
const service = new BookService(repository);
const controller = new BooksController(service);

const router = Router();

router.get('/books', validateQuery(bookQuerySchema) ,controller.index.bind(controller));
router.get('/books/:id', controller.edit.bind(controller));
router.post('/books', authenticateToken, validateBody(bookSchema), controller.create.bind(controller));
router.put('/books/:id', authenticateToken, validateBody(bookSchema), controller.update.bind(controller));
router.delete('/books/:id', authenticateToken, controller.delete.bind(controller));

export default router;