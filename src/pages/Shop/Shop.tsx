import styles from './Shop.module.scss';

import { useProducts } from "../../context/product-provider";
import { useCart } from '../../context/cart-provider';

import StockAvailableProducts from '../../Components/StockAvailableProducts/StockAvailableProducts';



const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const products = useProducts();

const stockAvailableProducts = products
  .map(product => ({
    ...product,
    variants: product.variants.filter(variant => variant.qty > 0),
  }))
  .filter(product => product.variants.length > 0);


  console.log("reached here");
  return (
    <div className={styles.container}>
    <section className={styles.shoppage}>
      <h2>Shop</h2>
      <StockAvailableProducts
        products={stockAvailableProducts}
        onAddToCart={addToCart}
      />
    </section>
    </div>
  );
};

export default Shop;