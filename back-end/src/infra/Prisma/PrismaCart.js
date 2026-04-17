class PrismaCart {
  constructor(prisma) {
    this.prisma = prisma
  }
async create({ cartId, userId, productId, quantity }) {
  return this.prisma.cart.update({
    where: {
      id: cartId,
      userId: userId
    },
    data: {
      items: {
        upsert: {
          where: {
            cartId_productId: {
              cartId,
              productId,
            },
          },
          update: {
            quantity: {
              increment: quantity,
            },
          },
          create: {
            productId,
            quantity,
          },
        },
      },
    },
  })
}
}

import PrismaClient from "./Prisma-client.js"

export default new PrismaCart(PrismaClient)