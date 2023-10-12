import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  telefone: string;
}

class CreateUserService {
  async execute({ name, email, password, cpf, cep, telefone }: UserRequest) {

    //verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorreto")
    }

    // Verificar se o CPF é válido 
    if (!cpf) {
      throw new Error("CPF incorreto")
    }

    //Verificar número
    if (!telefone) {
      throw new Error("Telefone incorreto")
    }

    //verofocar se esse email já está cadastrado na plataforma
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExist) {
      throw new Error("Usuário já existente")
    }

    const userWithSameCPF = await prismaClient.user.findFirst({
      where: {
        cpf: cpf
      }
    });

    if (userWithSameCPF) {
      throw new Error("Usuário com o mesmo CPF já existente");
    }

    const userWithSameTel = await prismaClient.user.findFirst({
      where: {
        telefone: telefone
      }
    });

    if (userWithSameTel) {
      throw new Error("Usuário com o este telefone já existente");
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        cpf,
        cep,
        telefone,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cep: true,
        cpf: true,
        telefone: true,
      }
    })

    return user;
  }
}

export { CreateUserService }