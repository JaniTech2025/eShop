import { useState, useEffect } from 'react';
import { db } from "../config/firestore";
import { collection, doc, getDocs, updateDoc, deleteField, serverTimestamp, writeBatch } from "firebase/firestore";
import React from 'react';

// Define Product type
// export type Product = {
//   id: string,
//   name: string;
//   favourited: boolean;
//   qty: number;
//   variants: {
//     colour: string;
//     image: string;
//     price: number;
//   }[];
//   sku: string;
//   createdAt: any;
//   updatedAt: any;
// };


const UpdateLightingProducts: React.FC = () => {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const updateProducts = async () => {
      setUpdating(true);
      try {
        const productsRef = collection(db, "lighting");
        const snapshot = await getDocs(productsRef);

        const updatePromises = snapshot.docs.map(async (document) => {
          const data = document.data();

          // Remove top-level qty and add qty to each variant
          const updatedVariants = data.variants?.map((variant: any) => ({
            ...variant,
            qty: 50,
          }));

          await updateDoc(doc(db, "lighting", document.id), {
            variants: updatedVariants,
          });

          return document.id;
        });

        await Promise.all(updatePromises);
        setStatus('All products updated successfully.');
      } catch (error) {
        console.error("Error updating products:", error);
        setStatus('Failed to update products.');
      } finally {
        setUpdating(false);
      }
    };

    updateProducts();
  }, []);

  return (
    <div>
      <h2>Update Lighting Products</h2>
      {updating ? <p>Updating...</p> : <p>{status}</p>}
    </div>
  );
};

export default UpdateLightingProducts;



// Sample data to be added
// const updatedData: Product[] = [
// { id: "prod001", name: "Pendant Light Aurora", favourited: true, qty: 12, variants: [{ colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", price: 129.99 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_gold.webp", price: 139.99 }], sku: "sku001", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod002", name: "Modern Globe Light", favourited: false, qty: 20, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/modern_white.webp", price: 89.5 }, { colour: "Smoke", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/modern_smoke.webp", price: 92.0 }], sku: "sku002", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod003", name: "Vintage Edison Pendant", favourited: true, qty: 5, variants: [{ colour: "Bronze", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/vintage_bronze.webp", price: 105.0 }, { colour: "Antique Brass", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/vintage_brass.webp", price: 112.5 }], sku: "sku003", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod004", name: "Chic Industrial Light", favourited: false, qty: 14, variants: [{ colour: "Matte Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/industrial_black.webp", price: 117.75 }, { colour: "Copper", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/industrial_copper.webp", price: 124.5 }], sku: "sku004", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod005", name: "Scandinavian Dome Pendant", favourited: true, qty: 9, variants: [{ colour: "Gray", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/scandi_gray.webp", price: 128.95 }, { colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/scandi_white.webp", price: 133.0 }], sku: "sku005", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod006", name: "Glass Teardrop Light", favourited: false, qty: 7, variants: [{ colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/glass_clear.webp", price: 141.0 }, { colour: "Frosted", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/glass_frosted.webp", price: 143.5 }], sku: "sku006", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod007", name: "Retro Orb Pendant", favourited: true, qty: 16, variants: [{ colour: "Copper", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/retro_copper.webp", price: 132.0 }, { colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/retro_silver.webp", price: 130.0 }], sku: "sku007", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod008", name: "Minimal Cone Light", favourited: false, qty: 11, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cone_white.webp", price: 98.99 }, { colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cone_black.webp", price: 101.0 }], sku: "sku008", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod009", name: "Geometric LED Pendant", favourited: true, qty: 18, variants: [{ colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/geo_led_black.webp", price: 149.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/geo_led_gold.webp", price: 158.0 }], sku: "sku009", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod010", name: "Lantern Cage Light", favourited: false, qty: 6, variants: [{ colour: "Rustic Iron", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cage_rustic.webp", price: 111.5 }, { colour: "Matte Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cage_black.webp", price: 114.0 }], sku: "sku010", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod011", name: "Flush Ceiling Pendant", favourited: false, qty: 13, variants: [{ colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/flush_silver.webp", price: 120.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/flush_gold.webp", price: 123.0 }], sku: "sku011", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod012", name: "Hanging Glass Lantern", favourited: true, qty: 8, variants: [{ colour: "Amber", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/lantern_amber.webp", price: 112.5 }, { colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/lantern_clear.webp", price: 118.0 }], sku: "sku012", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod013", name: "Industrial Cage Pendant", favourited: false, qty: 17, variants: [{ colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cage_black.webp", price: 135.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/cage_gold.webp", price: 139.5 }], sku: "sku013", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod014", name: "Modern Marble Light", favourited: true, qty: 6, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/marble_white.webp", price: 157.0 }, { colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/marble_black.webp", price: 162.5 }], sku: "sku014", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod015", name: "LED Hanging Tube Light", favourited: false, qty: 9, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/tube_white.webp", price: 125.0 }, { colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/tube_black.webp", price: 129.99 }], sku: "sku015", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod016", name: "Pendant Crystal Chandelier", favourited: true, qty: 4, variants: [{ colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/crystal_clear.webp", price: 189.99 }, { colour: "Amber", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/crystal_amber.webp", price: 199.5 }], sku: "sku016", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod017", name: "Spherical Pendant Light", favourited: false, qty: 12, variants: [{ colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/spherical_gold.webp", price: 145.0 }, { colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/spherical_silver.webp", price: 149.0 }], sku: "sku017", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod018", name: "Edison Bulb Chandelier", favourited: true, qty: 20, variants: [{ colour: "Bronze", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/edison_bronze.webp", price: 180.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/edison_gold.webp", price: 185.0 }], sku: "sku018", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod019", name: "Retro Wall Sconce", favourited: false, qty: 8, variants: [{ colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/wall_black.webp", price: 92.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/wall_gold.webp", price: 97.5 }], sku: "sku019", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod020", name: "Antique Brass Pendant", favourited: true, qty: 5, variants: [{ colour: "Brass", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/antique_brass.webp", price: 115.0 }, { colour: "Copper", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/antique_copper.webp", price: 120.0 }], sku: "sku020", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod021", name: "Globe Shaped Pendant", favourited: false, qty: 14, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/globe_white.webp", price: 110.0 }, { colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/globe_black.webp", price: 115.0 }], sku: "sku021", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod022", name: "Ceiling Dome Light", favourited: true, qty: 6, variants: [{ colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/dome_gold.webp", price: 125.0 }, { colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/dome_silver.webp", price: 130.0 }], sku: "sku022", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod023", name: "Decorative Star Pendant", favourited: false, qty: 10, variants: [{ colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/star_gold.webp", price: 150.0 }, { colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/star_silver.webp", price: 155.0 }], sku: "sku023", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod024", name: "Crystal Droplet Light", favourited: true, qty: 7, variants: [{ colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/crystal_clear_droplet.webp", price: 130.0 }, { colour: "Frosted", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/crystal_frosted_droplet.webp", price: 135.0 }], sku: "sku024", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod025", name: "Hanging Light Globe", favourited: false, qty: 15, variants: [{ colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/hanging_globe_clear.webp", price: 125.0 }, { colour: "Frosted", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/hanging_globe_frosted.webp", price: 130.5 }], sku: "sku025", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod026", name: "Industrial Loft Pendant", favourited: true, qty: 4, variants: [{ colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/loft_black.webp", price: 150.0 }, { colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/loft_gold.webp", price: 160.0 }], sku: "sku026", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod027", name: "Modern LED Ceiling Light", favourited: false, qty: 10, variants: [{ colour: "White", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/led_white.webp", price: 120.0 }, { colour: "Black", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/led_black.webp", price: 125.0 }], sku: "sku027", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod028", name: "Glass Tube Pendant", favourited: true, qty: 11, variants: [{ colour: "Clear", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/tube_clear.webp", price: 135.0 }, { colour: "Amber", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/tube_amber.webp", price: 140.0 }], sku: "sku028", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod029", name: "Vintage Wall Light", favourited: false, qty: 13, variants: [{ colour: "Rustic", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/vintage_rustic.webp", price: 115.0 }, { colour: "Bronze", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/vintage_bronze_wall.webp", price: 120.0 }], sku: "sku029", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
// { id: "prod030", name: "Art Deco Pendant", favourited: true, qty: 6, variants: [{ colour: "Gold", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/artdeco_gold.webp", price: 158.0 }, { colour: "Silver", image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/artdeco_silver.webp", price: 162.5 }], sku: "sku030", createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
// ];


// const BatchAddProducts: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const batchAddProducts = async (): Promise<void> => {
//     setLoading(true);
//     const batch = writeBatch(db);

//     const productsRef = collection(db, "lighting"); // Reference to the "lighting" collection

//     // Loop through the products and create add data
//     updatedData.forEach((data, index) => {
//       const productRef = doc(productsRef, `sku${index + 1}`); // Assuming SKU is used as document ID (sku1, sku2, ..., sku50)
//       batch.set(productRef, {
//         ...data,
//         image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", // Add image URL
//         createdAt: serverTimestamp(), // Add created timestamp
//         updatedAt: serverTimestamp(), // Add updated timestamp
//       });
//     });

//     try {
//       // Commit the batch add
//       await batch.commit();
//       console.log("Batch add successful!");
//     } catch (error) {
//       setError("Error performing batch add");
//       console.error("Error performing batch add:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={batchAddProducts} disabled={loading}>
//         {loading ? 'Adding products...' : 'Add Products to Firestore'}
//       </button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default BatchAddProducts;


// use this for batch update
// import React from "react";
// import ReactDOM from "react-dom/client";
// import BatchAddProducts from "./BatchAddProducts";

// function App() {
//   const handleBatchAdd = () => {
//     BatchAddProducts(); // Call the function if it's not a component
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Batch Add Products</h1>
//       <button
//         onClick={handleBatchAdd}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//       >
//         Add Products to Firestore
//       </button>
//     </div>
//   );
// }



