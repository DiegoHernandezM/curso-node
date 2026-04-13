
import { Router } from 'express';
import { CategoryController } from './controller'
import { CategoryService } from '../services/category.service'  ;
import { AuthMiddleware } from '../middleware/auth.middleware';


export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    
    // Definir las rutas
    router.get('/get', controller.getCategories );
    router.post('/register', [AuthMiddleware.handle], controller.register );


    return router;
  }


}

