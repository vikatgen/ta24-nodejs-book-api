import { Router } from 'express';
import * as CategoryController from "../controllers/category.controller.js";

const router = Router();

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.create);

export default router;