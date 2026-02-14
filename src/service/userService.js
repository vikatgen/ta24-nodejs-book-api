import NotFoundError from "../utils/NotFoundError.js";

class UserService {

    constructor(repository) {
        this.repository = repository;
    }

    async getUserByEmail(email) {
        const user = await this.repository.getUserByEmail(email);
        if (!user) throw new NotFoundError(`No user found.`);

        return user;
    }

    async checkUserExists(email) {
        return !!await this.repository.getUserByEmail(email);
    }

    async createUser(user) {
        return this.repository.createUser(user);
    }
}

export default UserService;