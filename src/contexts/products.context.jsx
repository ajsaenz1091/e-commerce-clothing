import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import PRODUCTS from '../shop-data.json'

export const ProductContext = createContext({
  setProducts: () => null,
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts};


//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => {
//         if(user) {
//             createUserDocumentFromAuth(user);
//         }
//         setCurrentUser(user)
//     })

//     return unsubscribe
//   }, [])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};