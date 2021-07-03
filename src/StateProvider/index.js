import React, { createContext, useContext, useReducer } from "react";
// Prepares Data Layer
export const StateContext = createContext();

// Wrap your app and Provide the Data layer.
export const StateProvider = ({ initialState, reducer, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull information from the Data Layer or to use the functionality we have steup our own cutom hooks.
export const useStateValue = () => useContext(StateContext);

// useReducer take two arguments one is function which is the reducer here.
// the second args is the initalstate value in object form.
