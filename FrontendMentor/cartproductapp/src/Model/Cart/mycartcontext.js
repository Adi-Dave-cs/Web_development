import { createContext, useState } from "react";

export const MyCartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItems = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItems = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, items) => Math.ceil(total + items.price * items.quantity),
      0
    );
  };

  return (
    <MyCartContext.Provider
      value={{
        cartItems,
        addItems,
        removeItems,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </MyCartContext.Provider>
  );
};
