import { TodoEntity } from '../entities/todo.entity.js';
import { UpdateTodoDto, CreateTodoDto } from '../dtos/index.js';



export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto):Promise<TodoEntity>;
  //todo :pagination
  abstract getAll():Promise<TodoEntity[]>;
  abstract getById(id: number):Promise<TodoEntity>;
  abstract updateById(id: number, updateTodoDto: UpdateTodoDto):Promise<TodoEntity>;
  abstract deleteById(id: number):Promise<TodoEntity>;
}
