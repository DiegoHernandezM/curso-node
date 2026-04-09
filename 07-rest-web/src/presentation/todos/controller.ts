import { Request, Response } from "express";
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoRepository } from "../../domain/repositories/todo.repository.js";



export class TodoController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) {
  }

  public getTodos = async (req: Request, res: Response) => {
    const todos= await this.todoRepository.getAll();
    res.json(todos);
  }

  public findTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todo = await this.todoRepository.getById(Number(id));
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });
    
    const todo = await this.todoRepository.create(createTodoDto!);
    return res.json({ message: 'Todo created successfully', todo });
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(id),
    })
    if(error) return res.status(400).json({ error });

    const todo = await this.todoRepository.getById(updateTodoDto!.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const todoUpdated = await this.todoRepository.updateById(updateTodoDto!.id, updateTodoDto!);
    return res.json({ message: 'Todo updated successfully', todoUpdated });
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTodo = await this.todoRepository.deleteById(Number(id));
    return res.json({ message: 'Todo deleted successfully', deleteTodo });
  }

}
