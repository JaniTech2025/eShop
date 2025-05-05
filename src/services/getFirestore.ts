import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firestore";

export const getFirestore = async () => {
  const collectionRef = collection(db, "lightfittings");
  const querySnapshot = await getDocs(collectionRef);
  const data = querySnapshot.docs.map((doc) => {
    const { id } = doc;
    const { createdOn: timestamp, ...rest } = doc.data();
    const createdOn = timestamp.toDate();
    return { id, createdOn, ...rest };
  });

  return data;
};


