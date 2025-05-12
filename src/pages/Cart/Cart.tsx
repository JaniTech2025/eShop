import styles from './Cart.module.scss';
import React, { useState } from 'react';
// import { useCart } from "../../context/cart-provider";
import { type CartItem as CartItemType, useCart } from '../../context/cart-provider';
import CartItem from "../../Components/CartItem/CartItem";

const Cart: React.FC = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [enable, setEnable] = useState(false);

  console.log("Cart Items", cartItems);

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.selectedVariant?.price || 0;
      const qty = item.qty ?? 1;
      return total + price * qty;
    }, 0);
  };


  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    clearCart();
    setEnable(false);
  }

  return (
    <div className={styles.pageContainer}>
      <h2>Your shopping cart</h2>

      {cartItems.length > 0 && (
        <div className={styles.cartheader}>
          <span>Name</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Subtotal</span>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty</p>
      ) : (
        <div className={styles.cartitems}>
          {cartItems.map((item) => (
          <CartItem
            key={item.id + item.selectedVariant?.colour}
            product={item}
            qty={item.qty}
            onRemove={() => removeFromCart(item.id, item.selectedVariant?.colour)}
          />          
          ))}
        </div>
      )}

      <div className={styles.carttotal}>
        <h3>Total: ${getTotal().toFixed(2)}</h3>
        <button disabled={cartItems.length === 0} onClick={handleClick}>CheckOut</button>
      </div>
    </div>
  );
};

export default Cart;