import styles from './Shop.module.scss';
import { useState } from 'react';
import {useNavigate} from "react-router";
import { useProducts } from "../../context/product-provider";
import { useCart } from '../../context/cart-provider';
import Pagination from "../../Components/Pagination/Pagination";

const ITEMS_PER_PAGE = 4;

const StockAvailableProducts: React.FC = () => {
  const navigate = useNavigate();
  const products = useProducts();
  const { addToCart } = useCart();

  console.log("All products", products)

  const stockAvailableProducts = products.filter(
    product => !product.favourited
  );

  console.log("Shop", stockAvailableProducts);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentProducts = stockAvailableProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.floor(stockAvailableProducts.length / ITEMS_PER_PAGE);

  console.log(stockAvailableProducts.length, ITEMS_PER_PAGE);

  return (
    <>
      {/* <div className={styles.headingWrapper}>
        <h2>Top favourites</h2>
      </div> */}
      <section className="featured">
        <div className={styles["product-grid"]}>
          {currentProducts.map(product => (
            <div className={styles.productcard} key={product.sku}>
              <img src={product.variants?.[0].image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.variants[0].price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default StockAvailableProducts;