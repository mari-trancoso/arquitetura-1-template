import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            //receber um valor
            const q = req.query.q as string | undefined

            const userBusiness = new UserBusiness()
            const output = await userBusiness.getUsers(q)
    
            //retornando uma resposta
            res.status(200).send(output)

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            //entrada
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.createUser(input)
            
            //resposta
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}