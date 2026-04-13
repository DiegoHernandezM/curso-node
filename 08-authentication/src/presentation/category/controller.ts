import { Request, Response } from "express";
import { RegisterCategoryDto } from "../../domain/dtos/category/register-category.dto";
import { CategoryService } from "../services/category.service";
import { CustomError } from "../../domain/errors/custom.errors";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";



export class CategoryController {
  constructor(  
    public categoryService: CategoryService,
  ) {
    }

  private handleError = (error:unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    }
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
  }

  register = async (req: Request, res: Response) => {
    const [error, registerCategoryDto] = RegisterCategoryDto.create(req.body);
    if (error) {
      return res.status(400).json({error});
    }
    this.categoryService.registerCategory(registerCategoryDto!, req.body.user)
    .then((category) => {
      res.json(category);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

  getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
    if (error) return res.status(400).json({error});
    
    this.categoryService.getCategories(paginationDto!)
    .then((categories) => {
      res.json(categories);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

}