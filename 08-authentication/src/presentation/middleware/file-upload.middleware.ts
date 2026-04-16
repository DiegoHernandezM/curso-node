import { Request, Response, NextFunction } from 'express';


export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if(!Array.isArray(req.files.file)) {
      req.body.file = [req.files.file];
    } else {
      req.body.file = req.files.file;
    }
    next();
  }
}