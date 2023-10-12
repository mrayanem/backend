import prismaClient from "../../prisma";

interface UserRequest {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  cep?: string;
  telefone?: string;
}

class UpdateUserService {
  execute(userId: string, user: UserRequest) {
    return prismaClient.user.update({
      data: {
        ...user
      },
      where: {
        id: userId
      }
    })
  }
}

export { UpdateUserService }