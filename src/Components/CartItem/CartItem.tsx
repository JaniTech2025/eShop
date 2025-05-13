import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProducts } from '../../context/product-provider.tsx';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { type CartItem as CartItemType, useCart } from '../../context/cart-provider.tsx';
import styles from "./CartItem.module.scss";

interface CartItemProps {
  product: CartItemType;
  qty: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, qty }) => {
  const products = useProducts();
  const [imageError, setImageError] = useState(false);
  const fallback = "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474280/645787_lgqgr8.webp";

  const { updateQuantity, removeFromCart } = useCart();

   const variant = product.selectedVariant;
  //  const variantQuantity = variant.qty;

  //  console.log("variant", variantQuantity);

  // const productInContext = products.find(p => p.id === product.id);


  // const stockQty =  variantQuantity; /*placeholder*/

  const handleIncrease = () => {


    // console.log("Check quantity from firestore", productFromContext, stockQty);

    // if (qty < stockQty) {
      updateQuantity(product.id, variant.colour, qty + 1);
    // } else {
    //   alert(`Only ${stockQty} item(s) available in stock.`);
    // }
  };

  const handleDecrease = () => {
    if (qty > 1) {
      updateQuantity(product.id, variant.colour, qty - 1);
    } else {
      removeFromCart(product.id, variant.colour);
    }
  };

  const handleImageError = () => setImageError(true);

 

  const onRemove = () => {
    removeFromCart(product.id, variant.colour);
  };

  return (
    <div className={styles.itemcontainer}>
    <div className={styles.cartItem}>
      <div className={styles.imageWrapper}>
      <img
        src={imageError ? fallback : variant.image}
        alt={product.name}
        onError={handleImageError}
        className={styles.image}
      />
      <div className={styles.name}>{product.name}</div>
      </div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrease}>−</button>
        <span>{qty}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className={styles.price}>${variant.price.toFixed(2)}</div>
      <span className={styles.trashIcon} onClick={onRemove}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </span>
      <div className={styles.subtotal}>${(variant.price * qty).toFixed(2)}</div>
    </div>
    </div>
  );
};

export default CartItem;
