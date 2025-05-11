import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-provider.tsx";
import styles from "./FavouritedProducts.module.scss";
import { useProducts } from "../../context/product-provider.tsx";

const ITEMS_PER_PAGE = 1;
const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

const FavouritedProducts: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();
  const products = useProducts();
  const { addToCart } = useCart();

  const favouritedProducts = products.filter(product => product.favourited).slice(0, 16);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prev => {
        const next = prev + ITEMS_PER_PAGE;
        return next >= favouritedProducts.length ? 0 : next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [favouritedProducts.length]);

  const currentProducts = favouritedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2>Our top picks</h2>
      </div>
      <section className={styles.featured}>
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
                <h3>{product.name}</h3>
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