import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthenticationError from "../utils/AuthenticationError.js";

class AuthController {

    constructor(service) {
        this.service = service;
    }

    async register(request, response, next) {
        try {
            const existingUser = await this.service.checkUserExists(request.body?.email);
            if (existingUser) throw new AuthenticationError("Invalid credentials")
            
            const hashedPassword = await bcrypt.hash(request.body?.password, 12);

            await this.service.createUser({
                email: request.body?.email,
                password: hashedPassword
            });

            response.sendStatus(201);
        } catch (exception) {
            next(exception);
        }
    }

    async login(request, response, next) {
        try {
            const user = await this.service.getUserByEmail(request.body?.email);

            const isPasswordValid = await bcrypt.compare(request.body?.password, user.password);
            if (!isPasswordValid) throw new AuthenticationError("Invalid credentials");

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            response.status(200).json({
                token
            });
        } catch (exception) {
            next(exception);
        }
    }
}

export default AuthController;

