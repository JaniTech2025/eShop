import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-provider.tsx";
import styles from "./FavouritedProducts.module.scss";
import { useProducts } from "../../context/product-provider.tsx";
import Pagination from "../../Components/Pagination/Pagination.tsx";



const ITEMS_PER_PAGE = 4;

const FavouritedProducts: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  const products = useProducts();
  const { addToCart } = useCart();

  const favouritedProducts = products.filter(({ favourited, qty }: { favourited: boolean; qty: number }) => favourited)
                                       .slice(0,16);

  console.log("favourited products", favouritedProducts);                                       

  const [currentPage, setCurrentPage] = useState(1);

  const fallback = "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474280/645787_lgqgr8.webp";


  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentProducts = favouritedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(favouritedProducts.length / ITEMS_PER_PAGE);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className = {styles.container}>
      <div className={styles.headingWrapper}>
        <h2>Top favourites</h2>
      </div>
      <section className={styles.featured}>
        <div className={styles.productgrid}>
        {currentProducts.map((product, index) => (
          <div className={styles.productcard} key={product.id}>
              {/* <img src={product.variants?.[0].image} alt="https://res.cloudinary.com/dwou0gtus/image/upload/v1746474280/645787_lgqgr8.webp" /> */}
              <img
                src={imageError ? fallback : product.variants?.[0].image}
                alt={product.name}
                onError={handleImageError}  // Trigger when the image fails to load
              />
              <h3>{product.name}</h3>
              <p>${product.variants?.[0].price}</p>
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
      </div>
    </>
  );
};

export default FavouritedProducts;