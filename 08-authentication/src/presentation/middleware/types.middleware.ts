import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../domain';


export class TypesMiddleware {
  static validTypes(validTypes:string[]) {
    return (req: Request, res: Response, next: NextFunction) => {

      const type = req.url.split('/')[2];
      if(!validTypes.includes(type)) {
        throw CustomError.badRequest('Invalid type');
      }
      next();
    }
    
  }
}