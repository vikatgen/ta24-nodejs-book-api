import { Router } from 'express';
import * as CategoryController from "../controllers/category.controller.js";
import { validateBody } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../validations/category.validation.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/categories', CategoryController.index);
router.post('/categories', authenticateToken, validateBody(categorySchema), CategoryController.create);
router.put('/categories/:id', authenticateToken, validateBody(categorySchema), CategoryController.update);
router.delete('/categories/:id', authenticateToken, CategoryController.destroy);

export default router;