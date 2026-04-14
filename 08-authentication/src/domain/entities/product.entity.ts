import { CustomError } from "../errors/custom.errors";

export class ProductEntity {    
  constructor(
    public id: number,
    public name: string,
    public userId: number,
    public available?: boolean,
    public price?: number,
    public categoryId?: number,
    public description?: string,
  ) {}

 static fromObject(obj: any) {
     const { id, _id, name, available, userId, price, categoryId, description } = obj;
     if (!_id && !id) throw CustomError.badRequest('Miss id field');
     if(!name) throw CustomError.badRequest('Miss name field');
     if(!userId) throw CustomError.badRequest('Miss userId field');

    
     return new ProductEntity( 
      id || _id,
      name,
      userId,
      available,
      price,
      categoryId,
      description,
     );
   }
}