import React from "react";
import "./FavouritedProducts.module.scss";
import { useProducts } from "../../context/product-provider";
import styles from "./FavouritedProducts.module.scss";


const FavouritedProducts: React.FC = () => {
  const products = useProducts();
  // console.log(products);

  const favouritedProducts = products.filter(product => product.favourited).slice(0, 3);  return (
    <>      
    <div className={styles.headingWrapper}>
      <h2>Top favourites</h2>
    </div>
    <section className="featured">
      <div className={styles["product-grid"]}>
        {favouritedProducts.map(product => (
        <div className={styles["product-card"]} key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default FavouritedProducts;
