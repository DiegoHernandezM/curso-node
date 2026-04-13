import { CategoryModel } from '../../data/';
import { CustomError, CategoryEntity, UserEntity, PaginationDto } from '../../domain';
import { RegisterCategoryDto } from '../../domain/dtos/category/register-category.dto';

export class CategoryService {
  constructor(){}

  async registerCategory(registerCategoryDto: RegisterCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({ name: registerCategoryDto.name });
    if(categoryExist) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...registerCategoryDto,
        userId: user.id,
      });
      await category.save();
      return CategoryEntity.fromObject(category);
    } catch (error) {
      throw CustomError.internalServerError('error papu');
    }
  }
  
  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {

      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find({ available: true })
        .skip((page - 1) * limit)
        .limit(limit),
      ]);
      return {
        page,
        limit,
        total,
        categories: categories.map((category) => CategoryEntity.fromObject(category)),
      }
    } catch (error) {
      throw CustomError.internalServerError('error papu');
    }
  }
}
