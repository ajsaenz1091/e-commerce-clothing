import { createContext, useReducer } from "react";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});



export const UserProvider = ({ children }) => {
  
  // const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
  
  // const { currentUser } = state

  

  // const value = { currentUser, setCurrentUser };


  

  // return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};