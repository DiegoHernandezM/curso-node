import { UserModel } from "../../data";
import { CustomError, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { bcryptAdapter, JwtAdapter } from "../../config";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { EmailService } from "./email.service";
import { envs } from "../../config/envs";

export class AtuhService {
  constructor(   
    private readonly emailService: EmailService,
  ) {
    }

  async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({email: registerUserDto.email});
    if (existUser) {
      throw CustomError.badRequest('Email already exists');
    }
    try {
      const user = new UserModel(registerUserDto);
      user.password = bcryptAdapter.hash(registerUserDto.password);
      await user.save();

      //Enviar correo de confirmacion
      await this.sendEmailValiation(user.email);
      
      const { password, ...result } = UserEntity.fromObject(user);
      const token = await JwtAdapter.generateToken({id: user.id});
      if (!token || token === '') {
        throw CustomError.internalServerError('Error generating token');
      }
      return {
        user: {...result},
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServerError(`Error registering user: ${error}`);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({email: loginUserDto.email});
    if (!user) {
      throw CustomError.badRequest('Email not found');
    }
    if (!bcryptAdapter.compare(loginUserDto.password, user.password)) {
      throw CustomError.badRequest('Password is incorrect');
    }
    
    const { password, ...result } = UserEntity.fromObject(user);
    const token = await JwtAdapter.generateToken({id: user.id});
    if (!token || token === '') {
      throw CustomError.internalServerError('Error generating token');
    }
    return {
      user: {...result},
      token: token,
    };    
  }

  private sendEmailValiation = async (email:string) => {
    const token = await JwtAdapter.generateToken({email: email});
    if (!token || token === '') {
      throw CustomError.internalServerError('Error generating token');
    }

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `<h1>Validate your email</h1>
      <p>Please click on the link below to validate your email:</p>
      <p><a href="${link}">${link}</a></p>`;
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }
    const isSet  =await this.emailService.sendEmail(options);
    if (!isSet) {
      throw CustomError.internalServerError('Error sending email');
    }
    return true;
  }
  
  async validateEmail(token: string) {
    const payload = await JwtAdapter.verifyToken(token);
    if (!payload) {
      throw CustomError.badRequest('Invalid token');
    }
    const payloadResult = payload;
    const { email } = payloadResult as { email: string };
    if (!email) {
      throw CustomError.internalServerError('Email not found');
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw CustomError.badRequest('Email not found');
    }
    if (user.emailVerified) {
      throw CustomError.badRequest('Email already validated');
    }
    user.emailVerified = true;
    await user.save();
    return true;    
  }
  
}