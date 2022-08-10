import { createContext, useContext, useReducer } from 'react';

type State = {
  drawerOpen: boolean;
};

type Action =
  | { type: 'setDrawerOpen'; open: boolean }
  | { type: 'toggleDrawer' };

type Reducer = React.Reducer<State, Action>;
type Dispatch = React.Dispatch<Action>;
type Value = [State, Dispatch];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggleDrawer': {
      return { ...state, drawerOpen: !state.drawerOpen };
    }
    case 'setDrawerOpen': {
      return { ...state, drawerOpen: action.open };
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  drawerOpen: false,
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
