import { createContext, useState, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
  categoriesMap: {},
});

const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: 'SET_CATEGORIES_MAP',
}

const categoriesReducer = (state, action) => {
  const { type, payload } = action

  switch(type){
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in categoriesReducer` )
  }
}

const INITIAL_STATE = {
  categoriesMap: {}
}

export const CategoriesProvider = ({ children }) => {
  
  const [{ categoriesMap }, dispatch ] = useReducer(categoriesReducer, INITIAL_STATE)


  const setCategoriesMap = (categoriesMap) => {
    dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, payload: categoriesMap})
  }

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, []);

  const value = { categoriesMap }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};