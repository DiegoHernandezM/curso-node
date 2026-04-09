import { CreateTodoDto, TodoDataSource, UpdateTodoDto, TodoEntity } from '../../domain/index.js';
import { prisma } from '../../data/postgres/index.js';



export class TodoDataSourceImpl implements TodoDataSource {

  async create(createTodoDto: CreateTodoDto):Promise<TodoEntity> {
    const todoCreated = await prisma.todo.create({ data: createTodoDto });
    return TodoEntity.fromObject(todoCreated);
  }

  async getAll():Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async getById(id: number):Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      throw new Error('todo not found');
    }
    return TodoEntity.fromObject(todo);
  }

  async updateById(id: number, updateTodoDto: UpdateTodoDto):Promise<TodoEntity> {
    await this.getById(updateTodoDto!.id!);
    const todoUpdated = await prisma.todo.update({ where: { id: updateTodoDto!.id }, data: updateTodoDto!.values });
    return TodoEntity.fromObject(todoUpdated);
  }

  async deleteById(id: number):Promise<TodoEntity> {
    await this.getById(id);
    const deleted = await prisma.todo.delete({ where: { id: Number(id) } });
    return TodoEntity.fromObject(deleted);
  }
  
}