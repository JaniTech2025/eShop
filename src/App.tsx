import { useEffect, useState } from "react";
// import { db } from "./config/firestore";
// import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import NavBar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { type Product } from "./services/type";
// import Carousel from "./Components/Carousel/Carousel";
// import { BatchAddProducts } from "./Components";
// import AddProductForm from "./Components/AddProductForm.tsx";
import styles from "./App.module.scss";
import { fetchLightingFixtures } from "./services/fetchLightingfixtures";
import { ProductsProvider } from "./context/product-provider";
import {CartProvider} from "./context/cart-provider";


// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image: string; // Just the first image
// };

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchLightingFixtures(setProducts);
  }, []);

  console.log(products);

  return (
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <div className={styles.container}>
            <NavBar />

            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>

            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;





