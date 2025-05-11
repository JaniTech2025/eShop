import styles from './Shop.module.scss';
// import { useState } from 'react';
// import { useNavigate } from "react-router";
import { useProducts } from "../../context/product-provider";
import { useCart } from '../../context/cart-provider';
// import Pagination from "../../Components/Pagination/Pagination";
// import { type Product } from '../../services/type';
import StockAvailableProducts from '../../Components/StockAvailableProducts/StockAvailableProducts';

// Define a new type that extends Product and adds selectedVariant


const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const products = useProducts();

  // const stockAvailableProducts = products.filter(product => !product.favourited);
const stockAvailableProducts = products
  .map(product => ({
    ...product,
    variants: product.variants.filter(variant => variant.qty > 0),
  }))
  .filter(product => product.variants.length > 0);


  console.log("reached here");
  return (
    <section className={styles.shoppage}>
      <h2>Shop</h2>
      <StockAvailableProducts
        products={stockAvailableProducts}
        onAddToCart={addToCart}
      />
    </section>
  );
};

export default Shop;