import React from 'react';
import { type CartItem as CartItemType, useCart } from '../../context/cart-provider.tsx';
import styles from "./CartItem.module.scss";

interface CartItemProps {
  product: CartItemType;
  qty: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, qty }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => updateQuantity(product.id, qty + 1);
  const handleDecrease = () => {
    if (qty > 1) {
      updateQuantity(product.id, qty - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className={styles.cartItem}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.name}>{product.name}</div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrease}>−</button>
        <span>{qty}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className={styles.price}>${product.price.toFixed(2)}</div>
      <div className={styles.subtotal}>${(product.price * qty).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
