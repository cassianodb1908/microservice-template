import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import SERVICE_IDENTIFIER from '../constants'
import{ IUserRepository } from '../repositories/UserRepository'
import container from '../container'
import { UserService } from '../services/UserSerice'
import Template from '../global/response'
import { ServerException } from '../../lib/custom-erros'
import APIError from '../global/response/apierror'

let repo = container.get<IUserRepository>(SERVICE_IDENTIFIER.IUserRepository);
let service = new UserService(repo)

class UserController {
    public static get = (req: Request, res: Response, next: any) => {
        service.get().then(users => {
            res.json(Template.success(users, 'Users Feated succesfully'));
        }).catch(err => {
            next(new ServerException('error occured'));
        })
    }

    public static post = (req: Request, res: Response, next: any) => {
        service.add(req.body).then(user => {
            if(user) {
                res.json(Template.success(user, 'User saved succesfully'));
            }
        }).catch(err => {
            if(err.ErrorID == 2110) {
                next(new APIError(err.message, err.ErrorID));
            }
            next(new ServerException('error occured'))
        })
    }
}