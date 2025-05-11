import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";
import { type Product } from "../services/type";

export const fetchLightingFixtures = async (setProducts: (item: Product[]) => void) => {
    const querySnapshot = await getDocs(collection(db, "lighting"));
    const items: Product[] = querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        favourited: data.favourited,
        qty: data.qty,
        variants: data.variants,
        sku: data.sku,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
    });
  setProducts(items);

  };



