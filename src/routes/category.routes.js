import { Router } from 'express';
import { validateBody } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../validations/category.validation.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

import CategoryController from "../controllers/category.controller.js";
import CategoryService from "../service/categoryService.js";
import CategoryRepository from "../repository/categoryRepository.js";

const repository = new CategoryRepository(prisma);
const service = new CategoryService(repository);
const controller = new CategoryController(service);

const router = Router();

router.get('/categories', controller.index.bind(controller));
router.post('/categories', authenticateToken, validateBody(categorySchema), controller.create.bind(controller));
router.put('/categories/:id', authenticateToken, validateBody(categorySchema), controller.update.bind(controller));
router.delete('/categories/:id', authenticateToken, controller.destroy.bind(controller));

export default router;