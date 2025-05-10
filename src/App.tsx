import { useEffect, useState } from "react";
// import { db } from "./config/firestore";
// import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import NavBar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { type Product } from "./services/type";
// import Carousel from "./Components/Carousel/Carousel";
// import AddProductForm from "./Components/AddProductForm.ts";
import styles from "./App.module.scss";
import { fetchLightingFixtures } from "./services/fetchLightingfixtures";
import { ProductsProvider } from "./context/product-provider";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image: string; // Just the first image
// };

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // const fetchLightingFixtures = async () => {
    //   const querySnapshot = await getDocs(collection(db, "lighting"));
    //   const items: Product[] = querySnapshot.docs.map(doc => {
    //     const data = doc.data() as { name: string; price: number; image: string };
    //     return {
    //       id: doc.id,
    //       name: data.name,
    //       price: data.price,
    //       image: data.image, 
    //     };
    //   });
    //   setProducts(items);
    // };

    fetchLightingFixtures(setProducts);
  }, []);

  console.log(products);

  return (
    <ProductsProvider>
    <BrowserRouter>
      <div className={styles.container}>
        <NavBar />

        <main className={styles.main}>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        {/* <AddProductForm/> */}

        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;