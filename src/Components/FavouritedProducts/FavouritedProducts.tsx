import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-provider";
import "./FavouritedProducts.module.scss";
import { useProducts } from "../../context/product-provider";
import styles from "./FavouritedProducts.module.scss";
import Pagination from "../../Components/Pagination/Pagination";


const ITEMS_PER_PAGE = 4;

const FavouritedProducts: React.FC = () => {
  const navigate = useNavigate();
  const products = useProducts();
  const { addToCart } = useCart();

  const favouritedProducts = products.filter(product => product.favourited);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentProducts = favouritedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(favouritedProducts.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className={styles.headingWrapper}>
        <h2>Top favourites</h2>
      </div>
      <section className="featured">
        <div className={styles["product-grid"]}>
          {currentProducts.map(product => (
            <div className={styles["product-card"]} key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
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

export default FavouritedProducts;