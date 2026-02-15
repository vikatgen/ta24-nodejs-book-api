import { Router } from 'express';
import {authenticationMiddleware} from "../middlewares/auth.middleware.js";
import {validateBody} from "../middlewares/validator.middleware.js";
import {bookingSchema} from "../validations/booking.validation.js";

import prisma from "../config/prisma.js";

import BookingRepository from "../repository/bookingRepository.js";
import BookingService from "../service/bookingService.js";
import BookingController from "../controllers/bookingController.js";

const repository = new BookingRepository(prisma);
const service = new BookingService(repository, prisma);
const controller = new BookingController(service);
const authenticateToken = authenticationMiddleware(prisma);

const router = Router();

router.use(authenticateToken);

router.get('/bookings', controller.index.bind(controller));
router.get('/bookings/:id', controller.show.bind(controller));
router.post('/bookings', validateBody(bookingSchema), controller.create.bind(controller));
router.patch('/bookings/:id/return', controller.return.bind(controller));
router.delete('/bookings/:id', controller.cancel.bind(controller));

export default router;