import { CustomError } from "../errors/custom.errors";

export class CategoryEntity {
  constructor(
    public id: number,
    public name: string,
    public userId: number,
    public available?: boolean,
  ) {}

 static fromObject(obj: any) {
     const { id, _id, name, available, userId } = obj;
     if (!_id && !id) throw CustomError.badRequest('Miss id field');
     if(!name) throw CustomError.badRequest('Miss name field');
     if(!userId) throw CustomError.badRequest('Miss userId field');
    
     return new CategoryEntity( 
      id || _id,
      name,
      userId,
      available,
     );
   }
}