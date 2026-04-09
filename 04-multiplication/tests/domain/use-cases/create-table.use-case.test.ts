import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';


describe('CreateTable', () => {
  test('should create a table with default values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 5 });
    const rows = table.split('\n').length;
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('5 x 1 = 5');
    expect(table).toContain('5 x 2 = 10');
    expect(rows).toBe(10);
  });
});
