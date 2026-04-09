export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: unknown }): TodoEntity {
    const { id, text, completedAt } = object;

    if (id === null || id === undefined) {
      throw new Error('id is required');
    }

    if (!text || typeof text !== 'string') {
      throw new Error('text is required');
    }

    let newCompletedAt: Date | null | undefined = completedAt as Date | null | undefined;

    if (completedAt) {
      newCompletedAt = new Date(completedAt as string);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('completedAt must be a valid date');
      }
    }

    return new TodoEntity(id as number, text, newCompletedAt);
  }
}