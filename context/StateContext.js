import React, { createContext, useContext,useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(
          (cartProduct) => cartProduct._id === product._id,
        );
    
        if (checkProductInCart) {
          setTotalPrice(totalPrice + product.price * quantity);
          setTotalQuantities(totalQuantities + quantity);
    
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) {
              return { ...cartProduct, quantity: cartProduct.quantity + quantity };
            }
            return cartProduct;
          });
    
          setCartItems(updatedCartItems);
          toast.success(`${qty} ${product.name} added`);
        } else {
          setTotalPrice(totalPrice + product.price * quantity);
          setTotalQuantities(totalQuantities + quantity);
          // eslint-disable-next-line no-param-reassign
          product.quantity = quantity;
          setCartItems([...cartItems, { ...product }]);
    
          toast.success(`${qty} ${product.name} added`);
        }
      };

      const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const tempCart = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(totalQuantities - foundProduct.quantity);
        setCartItems(tempCart);
      };
    
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);   

        if(value === 'inc') {
            // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
            setCartItems( prevCartItems => 
                prevCartItems.map( item => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity + 1}
                    }
                    return item
                })
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if(value === 'dec') {
            if (foundProduct.quantity > 1) {
            // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
            setCartItems( prevCartItems => 
                prevCartItems.map( item => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity - 1}
                    }
                    return item
                })
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };
    const decQty = () => {
        setQty((oldQty) => {
          let tempQty = oldQty - 1;
          if (tempQty < 1) {
            tempQty = 1;
          }
          return tempQty;
        });
    };

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);