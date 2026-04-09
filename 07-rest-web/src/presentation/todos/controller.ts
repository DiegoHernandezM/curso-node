import { Request, Response } from "express";
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";

export class TodoController {
  constructor() {
  }

  public getTodos =  (req: Request, res: Response) => {
    prisma.todo.findMany().then(todos => {
      res.json(todos);
    });
  }

  public findTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID is required or not a number number' });
    }
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    (todo) ?
      res.json(todo) :
      res.status(404).json({ message: 'Todo not found' });
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todo.create({ data: { text: createTodoDto! } });
    
    res.json({ message: 'Todo created successfully', todo });
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(id),
    })
    if(error) {
      return res.status(400).json({ error });
    }
    const todo = await prisma.todo.findUnique({ where: { id: updateTodoDto!.id } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    const todoUpdated = await prisma.todo.update({ where: { id: updateTodoDto!.id }, data: updateTodoDto!.values });
    res.json({ message: 'Todo updated successfully', todoUpdated });
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID is required or not a number number' });
    }
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    } 
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.json({ message: 'Todo deleted successfully' });
  }

}
