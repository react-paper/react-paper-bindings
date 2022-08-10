import { createContext } from 'react';
import { Value } from './reducer';

export const PaperContext = createContext<Value>(undefined!);
