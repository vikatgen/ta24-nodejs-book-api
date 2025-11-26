import { Router } from 'express';
import { validateBody, validateQuery } from "../middlewares/validator.middleware.js";
import { bookSchema } from "../validations/book.validation.js";
import * as BookController from "../controllers/books.controller.js";
import { bookQuerySchema } from "../validations/bookQuery.validation.js";

const router = Router();

router.get('/books', validateQuery(bookQuerySchema) ,BookController.getAllBooks);
router.get('/books/:id', BookController.getBookById);
router.post('/books', validateBody(bookSchema), BookController.createBook);
router.put('/books/:id', validateBody(bookSchema), BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;