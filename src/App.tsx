// src/App.tsx
import { useEffect, useState } from "react";
import { db } from "./config/firestore";
// import { collection, getDocs, DocumentData } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";


type Product = {
  id: string;
  name: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // const auth = getAuth();
  // onAuthStateChanged(auth, user => {
  //   if (user) {
  //     fetchLightingFixtures();
  //   } else {
  //     console.log("User not signed in");
  //   }
  // });

  useEffect(() => {
    const fetchLightingFixtures = async () => {
      const querySnapshot = await getDocs(collection(db, "lighting"));
      const items: Product[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<Product, "id">;
        return {
          id: doc.id,
          ...data
        };
      });
      setProducts(items);
    };

    fetchLightingFixtures();
  }, []);

  return (
    <div>
      <h1>Lighting Fixtures</h1>
      <ul>
        {products.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
