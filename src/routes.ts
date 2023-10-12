import { Router } from 'express';

import { UserController } from './controllers/user/UserController'
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

// --ROTAS USER CADASTRO
router.post('/users', new UserController().create)
router.get('/users', new UserController().list)
router.delete('/users/:id', new UserController().remove)
router.patch('/users/:id', new UserController().update)

// -- ROTA DE LOGIN
router.post('/session', new AuthUserController().handle)

export { router };