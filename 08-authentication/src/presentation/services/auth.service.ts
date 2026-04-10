import { UserModel } from "../../data";
import { CustomError, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { bcryptAdapter, JwtAdapter } from "../../config";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AtuhService {
  constructor(   
    
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
      
      const { password, ...result } = UserEntity.fromObject(user);
      return {
        user: {...result},
        token: 'ABS-RRRE',
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
  
}