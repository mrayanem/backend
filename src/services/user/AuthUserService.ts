
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
    cpf: string;
}

class AuthUserService{
    async execute({ email, password, cpf }: AuthRequest){
        console.log(email);
        //vetificar se existe
        const user = await  prismaClient.user.findFirst({
            where:{
                email: email,
                cpf: cpf
            }
        })

        if(!user){
            throw new Error("Usuário ou senha incorreto")
        }

        // verificar a senha
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorreto")
        }

        //gerar um token JWT e devolver os dados 
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };