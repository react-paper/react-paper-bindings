import { v4 as uuidv4 } from 'uuid';
import { Item, ItemData, ItemName } from '../../items';

export const defaultProps = {
  strokeColor: '#ff0000',
  strokeWidth: 3,
  strokeScaling: false,
};

export const createItem = (type: ItemName, data: ItemData): Item => {
  return {
    ...defaultProps,
    ...data,
    id: uuidv4(),
    type,
  };
};
