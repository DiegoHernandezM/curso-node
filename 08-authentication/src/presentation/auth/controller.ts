import { Request, Response } from "express";



export class AuthController {
  constructor(   
  ) {
    }

  register = async (req: Request, res: Response) => {
    res.json('Register successfully');
  }

  loginUser = async (req: Request, res: Response) => {
    res.json('Login successfully');
  }

  validateEmail = async (req: Request, res: Response) => {
    res.json('Validate email successfully');
  }


}