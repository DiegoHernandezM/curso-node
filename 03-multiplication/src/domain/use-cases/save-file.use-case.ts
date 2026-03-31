import fs from 'fs';

export interface SaveFileUseCase {
  execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
  fileName?: string;
  content: string;
  destination?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}
  execute({ 
    fileName = 'multiplication-table.txt',
    content, 
    destination = 'outputs'
  }: SaveFileOptions){
    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}`, content);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}