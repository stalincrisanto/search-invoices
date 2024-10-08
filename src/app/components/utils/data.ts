import * as dayjs from 'dayjs';
import { Invoice, Person, SearchParams } from 'src/app/types/person.type';

const date = dayjs().format("DD/MM/YYYY");

export const PERSONS_DATA: Person[] = [
  { id: '1', cardId: '1723401715', name: 'Stalin', lastName: 'Crisanto' },
  { id: '2', cardId: '1708102718', name: 'Luis', lastName: 'Rodrígues' },
  { id: '3', cardId: '1708051311', name: 'Mónica', lastName: 'Ramírez' },
];

export const INVOICES_DATA: Invoice[] = [
  {
    id: '1',
    personId: '1723401715',
    total: 1.0079,
    date,
  },
  {
    id: '2',
    personId: '1723401715',
    total: 2.0079,
    date,
  },
  {
    id: '3',
    personId: '1708102718',
    total: 0.79,
    date,
  },
  {
    id: '4',
    personId: '1708051311',
    total: 1.0079,
    date,
  },
];
