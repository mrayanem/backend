import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors';

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors())

app.use(router);

//estamos fazendo isso para "melhorar" a mensagem de erro que pode aparecer para a o usuario
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        //se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'internal sever error.'
    })

})

app.listen(5555, () => console.log('Server online!'))