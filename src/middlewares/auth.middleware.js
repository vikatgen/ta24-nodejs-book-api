import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import AuthenticationError from "../utils/AuthenticationError.js";

export const authenticateToken = async (request, response, next) => {
    try {
            const token = request.headers.authorization?.replace('Bearer ', '');

            if (!token) throw new AuthenticationError("Token not provided");

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({ where: { id: payload.id } });

            request.user = {
                id: user.id,
                email: user.email
            };

            next();
    } catch (exception) {
        next(exception);
    }
};

/*
export const authenticateToken = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;

        // Ootame vormingut: "Bearer <token>"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.status(401).json({
                message: 'Unauthorized'
            });
        }

        const token = authHeader.slice(7); // eemaldab "Bearer "

        let payLoad;
        try {
            payLoad = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // Vale / aegunud token → 401, mitte 500
            return response.status(401).json({
                message: 'Invalid token'
            });
        }

        const user = await prisma.user.findUnique({ where: { id: payLoad.id } });

        if (!user) {
            return response.status(401).json({
                message: 'Unauthorized'
            });
        }

        request.user = {
            id: user.id,
            email: user.email
        };

        next();
    } catch (exception) {
        next(exception);
    }
};*/
