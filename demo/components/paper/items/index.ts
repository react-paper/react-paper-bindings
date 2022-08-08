import { Circle } from './Circle';
import { Path } from './Path';

export type ItemType = typeof Circle | typeof Path;

export const Items: { [key: string]: ItemType } = {
  Circle,
  Path,
};

export * from './types';
