import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";

export const getAllProducts = async () => {
    const collectionRef = collection(db, 'lighting');
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};