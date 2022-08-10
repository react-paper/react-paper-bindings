import { Item } from '../items';

export type Route = {
  id: string;
  name: string;
  items: Item[];
};
