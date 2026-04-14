import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CustomError } from "../../domain/errors/custom.errors";
import { RegisterProductDto, PaginationDto } from "../../domain";



export class ProductController {
  constructor(  
    public productService: ProductService,
  ) {
    }

  private handleError = (error:unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    }
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
  }

  create = async (req: Request, res: Response) => {
    const [error, registerProductDto] = RegisterProductDto.create({...req.body, userId: req.body.user.id});
    if (error) {
      return res.status(400).json({error});
    }
    this.productService.createProduct(registerProductDto!)
    .then((product) => {
      res.json(product);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
    if (error) return res.status(400).json({error});
    
    this.productService.getProducts(paginationDto!)
    .then((products) => {
      res.json(products);
    }).catch((error) => {
      this.handleError(error, res);
    });
  }

}