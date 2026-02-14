import { Router } from 'express';
import { validateBody } from "../middlewares/validator.middleware.js";
import { authSchema } from "../validations/auth.validation.js";

import prisma from "../config/prisma.js";

import UserRepository from "../repository/userRepository.js";
import UserService from "../service/userService.js";
import AuthController from "../controllers/auth.controller.js";

const repository = new UserRepository(prisma);
const service = new UserService(repository);
const controller = new AuthController(service);

const router = Router();

router.post('/register', validateBody(authSchema), controller.register.bind(controller));
router.post('/login', validateBody(authSchema), controller.login.bind(controller));

export default router;