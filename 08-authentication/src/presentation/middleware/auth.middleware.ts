import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../data/mongo/models/user.mode';
import { UserEntity } from '../../domain';


export class AuthMiddleware {

  static async handle(req: Request, res: Response, next: NextFunction) {
    const autthorizarion = req.header('Authorization');
    if (!autthorizarion) return res.status(401).json({ message: 'Token is missing' });
    if (!autthorizarion.startsWith('Bearer ')) return res.status(401).json({ message: 'Token is invalid' });
    const token = autthorizarion.split(' ').at(1);
    try {
      const payload =  await JwtAdapter.verifyToken<{ id: string }>(token as string);
      if (!payload) return res.status(401).json({ message: 'Token is invalid' });
      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ message: 'User not found' });
      req.body.user = UserEntity.fromObject(user);
      
      next();
      
    } catch (error) {
      return res.status(500).json(error);
    }

  }
}