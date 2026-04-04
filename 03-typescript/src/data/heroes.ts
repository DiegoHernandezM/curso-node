interface Hero {
  id: number;
  name: string;
  owner: string;
}

export const heroes: Hero[] = [
  {
    id: 1, 
    name: 'Superman',
    owner: 'DC'
  },
  { id: 2, name: 'Batman', owner: 'DC' },
  { id: 3, name: 'Ironman', owner: 'Marvel' },
];
