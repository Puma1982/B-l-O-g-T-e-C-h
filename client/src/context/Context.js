import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,  //OBJECT USER NULL BECAUSE WHEN WE VISIT THE PAGE NO USER //TAKE USER FROM THE LOCALSORAGE AND IF NO USER || WILL BE NULL
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE); //

export const ContextProvider = ({ children }) => {             //CONTEXT PROVIDER FOR REACH THE INITIAL STATE
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);      //THE REDUSER GONNA UPDATE THE INITIAL STATE

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));   //CONVERT USER.STATE TO JSON FILE
  }, [state.user]);

  return (
    <Context.Provider                            //WE USE CONTEXT LIKE PROVIDER
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,                        //BECAUSE WHEN WE CLICK IN LOGIN BURTTON WILL BE THE DISPATCH START AND ACCORDING TO OUR SERVER FOR DISPATCH SUCCESSFUL OR ERROR
      }}
    >
      {children}
    </Context.Provider>
  );
};
