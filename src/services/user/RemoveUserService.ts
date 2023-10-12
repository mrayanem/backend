import prismaClient from "../../prisma";

class RemoveUserService {
  execute(userId: string) {
    return prismaClient.user.delete({
      where: {
        id: userId
      }
    })
  }
}

export { RemoveUserService }