
import { Router } from 'express';
import { ProductController } from './controller'
import { ProductService } from '../services/product.service'  ;
import { AuthMiddleware } from '../middleware/auth.middleware';


export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);
    
    // Definir las rutas
    router.get('/get', controller.getProducts );
    router.post('/create', [AuthMiddleware.handle], controller.create );


    return router;
  }


}

