import { Validators } from "../../../config";




export class RegisterProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly available: boolean,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly description?: string,
  ) {}

  static create(obj: {[key: string]: any}): [string?, RegisterProductDto?] {
    const { name, price = 0, available  = false, userId, categoryId, description = '' } = obj;   
    
    let priceNum = price;
    if (typeof price !== 'number') {
      priceNum = Number(price);
    }
    let availableFlag = available;
    if (!name) return ['Miss name field'];
    if (!userId) return ['Miss userId field'];
    if (!Validators.isMongoID(userId)) return ['Invalid userId format'];
    if (!categoryId) return ['Miss categoryId field'];
    if (!Validators.isMongoID(categoryId)) return ['Invalid categoryId format'];
    if (typeof available !== 'boolean') {
      availableFlag = (available === 'true');
    }


    return [undefined, new RegisterProductDto(
      name, priceNum, availableFlag, userId, categoryId, description
    )];
  }
}