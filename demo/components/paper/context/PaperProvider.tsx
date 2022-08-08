import React, { FC, useReducer } from "react";
import { PaperContext } from "./PaperContext";
import { Reducer, reducer, initialState } from "./reducer";

type Props = {
  children: React.ReactNode;
};

export const PaperProvider: FC<Props> = ({ children }) => {
  const value = useReducer<Reducer>(reducer, initialState);
  return (
    <PaperContext.Provider value={value}>{children}</PaperContext.Provider>
  );
};
