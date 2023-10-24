import { createContext, useEffect, useReducer } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_ITEM_COUNT: 'SET_CART_ITEM_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL'
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type){
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEM_COUNT:
      return {
        ...state,
        cartItemCount: payload
      }
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer` )
  }


}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal:0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
}

export const CartProvider = ({ children }) => {
  const [ {isCartOpen, cartItems, cartItemCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen})
  }

  const setCartItems = (cartItems) => {
    dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems})
  }

  const setCartItemCount = (cartItemCount) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEM_COUNT, payload: cartItemCount})
  }

  const setCartTotal = (cartTotal) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: cartTotal})
  } 

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartItemCount(count);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);


  const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};