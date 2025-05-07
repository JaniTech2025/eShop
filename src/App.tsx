import { useEffect, useState } from "react";
import { db } from "./config/firestore";
import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import NavBar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import Carousel from "./Components/Carousel/Carousel";
// import Carousel from "./Components/Carousel/Carousel";
// import AddProductForm from "./Components/AddProductForm";
import styles from "./App.module.scss";

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
    <BrowserRouter>
      <div className={styles.container}>
        <NavBar />

        <main className={styles.main}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <div>
          <Carousel />
        </div>

        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;