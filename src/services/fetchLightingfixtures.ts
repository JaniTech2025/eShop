import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";
import { type Product } from "../services/type";

export const fetchLightingFixtures = async (setProducts: (item: Product[]) => void) => {
    const querySnapshot = await getDocs(collection(db, "lighting"));
    const items: Product[] = querySnapshot.docs.map(doc => {
      const data = doc.data() as { name: string; price: number; quantity: number; image: string, favourited: boolean };
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        image: data.image, 
        favourited: data.favourited,
        quantity: data.quantity
      };
    });
  setProducts(items);

  };



