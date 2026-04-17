export default class PrismaTransactionUserAndCart {
    constructor(PrismaClient){
        this.prisma = PrismaClient;
    }

    async createUserAndCart(userData){
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({data: userData});
            const cart = await tx.cart.create({data: {userId: user.id}});

            console.log('userr', user)

            return { user, cart };
        });
    }
} 