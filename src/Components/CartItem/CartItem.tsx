import React from 'react';
import { useState } from 'react';
import { type CartItem as CartItemType, useCart } from '../../context/cart-provider.tsx';
import styles from "./CartItem.module.scss";

interface CartItemProps {
  product: CartItemType;
  qty: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, qty }) => {
  const [imageError, setImageError] = useState(false);
  const fallback = "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474280/645787_lgqgr8.webp";
  const { updateQuantity, removeFromCart } = useCart();
  const handleIncrease = () => updateQuantity(product.id, qty + 1);
  const handleDecrease = () => {
    if (qty > 1) {
      updateQuantity(product.id, qty - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  }

  return (
    <div className={styles.cartItem}>
      {/* <img src={product.variants?.[0].image} alt={product.name} className={styles.image} /> */}
      <img
        src={imageError ? fallback : product.variants?.[0].image}
        alt={product.name}
        onError={handleImageError}  // Trigger when the image fails to load
      />
      <div className={styles.name}>{product.name}</div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrease}>−</button>
        <span>{qty}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className={styles.price}>${product.variants?.[0].price.toFixed(2)}</div>
      <div className={styles.subtotal}>${(product.variants?.[0].price * qty).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
