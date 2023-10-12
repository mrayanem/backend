import { Request, response, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService';
import { ListUsersService } from '../../services/user/ListUsersService';
import { RemoveUserService } from '../../services/user/RemoveUserService';
import { UpdateUserService } from '../../services/user/UpdateUserService';

//Uma função declarada como async significa 
//que o valor de retorno da função será, 
//"por baixo dos panos".
class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, cpf, cep, telefone } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
            cpf,
            cep,
            telefone
        });

        return res.json(user)
    }

    async list(req: Request, res: Response) {
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute();

        try {
            return res.json(users);
        } catch {
            return res.status(400)
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400)
        }

        const removeUserService = new RemoveUserService();

        try {
            await removeUserService.execute(id)

            return res.status(204).send()
        } catch (error) {
            return res.status(400).send()
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const { name, email, password, cpf, cep, telefone } = req.body;

        if (!id) {
            return res.status(400)
        }

        const updateUserService = new UpdateUserService();

        try {
            const user = await updateUserService.execute(id, { name, email, password, cpf, cep, telefone })

            return res.json(user)
        } catch (error) {
            return res.status(400).send()
        }
    }
}

export { UserController }