import AppError from "./AppError.js";

class ExistingEntityError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

export default ExistingEntityError;