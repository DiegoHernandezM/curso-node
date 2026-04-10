import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AtuhService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.errors";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";


export class AuthController {
  constructor(  
    public authService: AtuhService,
  ) {
    }

  private handleError = (error:unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    }
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
  }

  register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({error});
    }
    this.authService.registerUser(registerUserDto!)
    .then((user) => {
      res.json(user);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) {
      return res.status(400).json({error});
    }
    this.authService.loginUser(loginUserDto!)
    .then((loginUserDto) => {
      res.json(loginUserDto);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

  validateEmail = async (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService.validateEmail(token)
    .then(() => {
      res.json('Validate email successfully');
    }).catch((error) => {
      this.handleError(error, res);
    });


  }


}