import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import {request, response} from "express";

export const register = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return response.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return response.status(201).json({
            message: 'User created successfully'
        });
    } catch (exception) {
        next(exception)
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return response.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (exception) {
        next(exception);
    }
};

