import { TodoRepository, TodoDataSource, CreateTodoDto, UpdateTodoDto, TodoEntity } from '../../domain/index.js';



export class TodoRepositoryImpl implements TodoRepository {

    constructor(private readonly todoDataSource: TodoDataSource) {
    }

    async create(createTodoDto: CreateTodoDto):Promise<TodoEntity> {
        return this.todoDataSource.create(createTodoDto);
    }
    async getAll():Promise<TodoEntity[]> {
        return this.todoDataSource.getAll();
    }
    async getById(id: number):Promise<TodoEntity> {
        return this.todoDataSource.getById(id);
    }
    async updateById(id: number, updateTodoDto: UpdateTodoDto):Promise<TodoEntity> {
        return this.todoDataSource.updateById(id, updateTodoDto);
    }
    
    async deleteById(id: number):Promise<TodoEntity> {
        return this.todoDataSource.deleteById(id);
    }
}