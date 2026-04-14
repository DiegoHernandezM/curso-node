import { CategoryModel } from '../../data/';
import { ProductModel } from '../../data/';
import { CustomError, CategoryEntity, ProductEntity, PaginationDto, RegisterProductDto } from '../../domain';

export class ProductService {
  constructor(){}

  async createProduct(registerProductDto: RegisterProductDto) {
    const productExist = await ProductModel.findOne({ name: registerProductDto.name });
    if(productExist) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel({...registerProductDto});
      await product.save();
      return ProductEntity.fromObject(product);
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
  
  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find({ available: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('categoryId', 'name')
        .populate('userId', 'name email')
      ]);
      return {
        page,
        limit,
        total,
        products: products.map((product) => ProductEntity.fromObject(product)),
      }
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
