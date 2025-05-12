import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-provider.tsx";
import styles from "./FavouritedProducts.module.scss";
import { useProducts } from "../../context/product-provider.tsx";

const ITEMS_PER_PAGE = 3;
const AUTO_SCROLL_INTERVAL = 5000;

const FavouritedProducts: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();
  const products = useProducts();
  const { addToCart } = useCart();

  const favouritedProducts = products.filter(product => product.favourited);
  const fallback = "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474280/645787_lgqgr8.webp";

  const handleImageError = () => {
    setImageError(true);
  };

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleNext = () => {
    setStartIndex(prev =>
      Math.min(prev + ITEMS_PER_PAGE, favouritedProducts.length - ITEMS_PER_PAGE)
    );
  };

  const currentProducts = favouritedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2>Our top picks</h2>
      </div>
      <section>
        <div className={styles.carouselWrapper}>
          <button
            className={styles.arrowButton}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            {'<<'}
          </button>

          <div className={styles.carousel}>
            {currentProducts.map(product => (
              <div className={styles.productcard} key={product.id}>
                <img
                  src={imageError ? fallback : product.variants?.[0].image}
                  alt={product.name}
                  onError={handleImageError}
                />
                <h2>{product.name}</h2>
              </div>
            ))}
          </div>

          <button
            className={styles.arrowButton}
            onClick={handleNext}
            disabled={startIndex + ITEMS_PER_PAGE >= favouritedProducts.length}
          >
            {'>>'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default FavouritedProducts;