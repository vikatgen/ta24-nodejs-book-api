import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import dotenv from 'dotenv';
import ExistingEntityError from "../utils/ExistingEntityError.js";
import NotFoundError from "../utils/NotFoundError.js";
import AuthenticationError from "../utils/AuthenticationError.js";

dotenv.config();

export const register = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) throw new ExistingEntityError("Incorrect credentials");

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        response.sendStatus(201);
    } catch (exception) {
        next(exception)
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundError("Incorrect credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new AuthenticationError("Invalid credentials");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (exception) {
        next(exception);
    }
};

