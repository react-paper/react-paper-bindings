import { Circle } from './Circle';
import { Delete } from './Delete';
import { Move } from './Move';
import { Pen } from './Pen';
import { Select } from './Select';

export enum ToolName {
  Circle = 'Circle',
  Delete = 'Delete',
  Move = 'Move',
  Pen = 'Pen',
  Select = 'Select',
}

export type ToolType =
  | typeof Circle
  | typeof Delete
  | typeof Move
  | typeof Pen
  | typeof Select;
