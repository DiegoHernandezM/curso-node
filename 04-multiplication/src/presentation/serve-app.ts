import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServeApp {
  static run({base, limit, show, name, destination}: RunOptions) {
    console.log('ServeApp run...');
    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({ content: table, fileName: name, destination });
    if(show) console.log(table);
    (wasCreated) ? console.log('Archivo creado') : console.log('Error al crear archivo');
  }
}