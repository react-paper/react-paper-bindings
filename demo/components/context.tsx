import { createContext, useContext, useReducer } from 'react';

type State = {
  drawerOpen: boolean;
  theme: 'light' | 'dark';
};

type Action =
  | { type: 'setDrawerOpen'; open: boolean }
  | { type: 'toggleDrawer' }
  | { type: 'toggleTheme' };

type Reducer = React.Reducer<State, Action>;
type Dispatch = React.Dispatch<Action>;
type Value = [State, Dispatch];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setDrawerOpen': {
      return { ...state, drawerOpen: action.open };
    }
    case 'toggleDrawer': {
      return { ...state, drawerOpen: !state.drawerOpen };
    }
    case 'toggleTheme': {
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  drawerOpen: false,
  theme: 'dark',
};

export const AppContext = createContext<Value>(undefined!);

type Props = {
  children?: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const value = useReducer<Reducer>(reducer, initialState);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
