import styles from './Cart.module.scss';
import React from 'react';
import {useCart} from "../../context/cart-provider";
import CartItem from "../../Components/CartItem/CartItem";



const Cart: React.FC = () => {
  const {cartItems} = useCart();

  console.log("Items", cartItems);

const getTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * (item.qty ?? 1), 0);
};
  return(
    <div className={styles.pageContainer}>
      <h2> Your shopping cart </h2>
              {cartItems.length > 0 && (
          <div className={styles.cartHeader}>
            <span>Image</span>
            <span>Name</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Subtotal</span>
          </div>
        )}
      {cartItems.length === 0? (<p>Your cart is currently empty</p>) :
      (<div className={styles.cartitems}>
        {cartItems.map((item => (
        <CartItem key={item.id} product={item} qty={item.qty} /> )))}
      </div>
      )}
      <div className = {styles.carttotal}>
        <h3>Total: ${getTotal().toFixed(2)}</h3>
        <button disabled>CheckOut</button> 
      </div>
    </div>

  );
}

export default Cart