import { useEffect, useState } from "react";
import { db } from "./config/firestore";
import { collection, getDocs } from "firebase/firestore";
import Carousel from "./Components/Carousel/Carousel";
// import AddProductForm from "./Components/AddProductForm";
// import styles from "./App.module.scss";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string; // Just the first image
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLightingFixtures = async () => {
      const querySnapshot = await getDocs(collection(db, "lighting"));
      const items: Product[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as { name: string; price: number; image: string };
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.image, 
        };
      });
      setProducts(items);
    };

    fetchLightingFixtures();
  }, []);

  console.log(products);

  return (
    <div>
      {/* <h1>Lighting Fixtures</h1>
      <div className={styles.container}>
        {products.map(item => (
          <div className={styles.card} key={item.id}>
            <p>{item.name} ${item.price}</p>
            {item.image && (
              <img
                src={item.image}
                alt={`${item.image} image`}
              />
            )}
            </div>
        ))}
      </div> */}

        <Carousel /> 

      {/* <AddProductForm/> */}

    </div>
  );
}

export default App;