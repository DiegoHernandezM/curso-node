import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middleware/file-upload.middleware';
import { TypesMiddleware } from '../middleware/types.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const fileUploadController = new FileUploadController(new FileUploadService());

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypesMiddleware.validTypes(['users', 'products', 'categories']));
    router.post('/single/:type', fileUploadController.uploadFile);
    router.post('/multiple/:type', fileUploadController.uploadMultipleFiles);


    return router;
  }
}