

export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: string,
  ) {
    
  }

  get values() {
    const returnObj: { [key:string]: any } = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }

  static create(props: {[ key:string]: any }): [string?, UpdateTodoDto?] {
    const { id, text,completedAt } = props;   
    if (!id || isNaN(Number(id))) return ['Id is required'];

    let date  = completedAt;
    if (completedAt) {
      date = new Date(completedAt);
      if (date.toString() === 'Invalid Date') {
        return ['CompletedAt is invalid date'];
      }
    }

    
    const todo = new UpdateTodoDto(Number(id), text, date);
    return ['', todo];
  }
}