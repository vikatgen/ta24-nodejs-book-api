import { Router } from 'express';
import { validate } from "../middlewares/validator.middleware.js";
import {authorSchema} from "../validations/author.validation.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

import prisma from "../config/prisma.js";
import AuthorRepository from "../repository/authorRepository.js";
import AuthorService from "../service/authorService.js";
import AuthorController from "../controllers/authors.controller.js";

const repository = new AuthorRepository(prisma);
const service = new AuthorService(repository);
const controller = new AuthorController(service);

const router = Router();

router.get('/authors', controller.index.bind(controller));
router.get('/authors/:id', controller.show.bind(controller));
router.post('/authors', authenticateToken, validate(authorSchema), controller.create.bind(controller));
router.put('/authors/:id', authenticateToken, validate(authorSchema), controller.update.bind(controller));
router.delete('/authors/:id', authenticateToken, controller.delete.bind(controller));

export default router;