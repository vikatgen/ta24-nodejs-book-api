import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import AuthenticationError from "../utils/AuthenticationError.js";

export const authenticateToken = async (request, response, next) => {
    try {
            const token = request.headers.authorization?.replace('Bearer ', '');

            if (!token) throw new AuthenticationError("Token not provided");

            const payload = jwt.verify(token, process.env.JWT_SECRET);

            // TODO: Refactor to repository level for testability @vikatgen
            const user = await prisma.user.findUnique({ where: { id: payload.id } });
            if (!user) throw new AuthenticationError("Invalid token");

            request.user = {
                id: user.id,
                email: user.email
            };

            next();
    } catch (exception) {
        next(exception);
    }
};
