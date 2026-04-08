import { Request, Response } from "express";


const todos = [
      { id: 1, text: 'Buy groceries', createdAt: new Date() },
      { id: 2, text: 'Walk the dog', createdAt: new Date() },
      { id: 3, text: 'Read a book', createdAt: new Date() },
    ];

export class TodoController {
  constructor() {
  }

  public getTodos =  (req: Request, res: Response) => {
    res.json(todos);
  }

  public findTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID is required or not a number number' });
    }

    const todo = todos.find(t => t.id === Number(id));
    (todo) ?
      res.json(todo) :
      res.status(404).json({ message: 'Todo not found' });
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    todos.push({ id: todos.length + 1, text, createdAt: new Date() });
    res.json({ message: 'Todo created successfully', todo: todos[todos.length - 1] });
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID is required or not a number number' });
    }
    const todo = todos.find(t => t.id === Number(id));
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    todo.text = text;
    res.json({ message: 'Todo updated successfully', todo });
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID is required or not a number number' });
    }
    const todo = todos.find(t => t.id === Number(id));
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(todos.indexOf(todo), 1);
    res.json({ message: 'Todo deleted successfully' });
  }

}
