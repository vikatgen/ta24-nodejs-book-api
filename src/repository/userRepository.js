class UserRepository {

    constructor(prisma) {
        this.prisma = prisma;
    }

    async getUserByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(user) {
        return this.prisma.user.create({ data: user });
    }

}

export default UserRepository;