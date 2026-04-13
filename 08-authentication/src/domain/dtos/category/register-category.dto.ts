import { regularExps } from '../../../config';



export class RegisterCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
  ) {}

  static create(obj: {[key: string]: any}): [string?, RegisterCategoryDto?] {
    const { name, available  = false } = obj;
    let availableFlag = available;
    if (!name) return ['Miss name field'];
    if (typeof available !== 'boolean') {
      availableFlag = (available === 'true');
    }
    return [undefined, new RegisterCategoryDto(name, availableFlag)];
  }
}