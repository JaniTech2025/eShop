import React from 'react';
import { type CartItem as CartItemType, useCart } from '../../context/cart-provider.tsx';
import styles from "./CartItem.module.scss";

interface CartItemProps {
  product: CartItemType;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
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
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className={styles.price}>${product.price.toFixed(2)}</div>
      <div className={styles.subtotal}>${(product.price * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
