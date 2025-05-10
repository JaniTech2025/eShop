import { useState } from 'react';
import { db } from "../config/firestore";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";

// Define Product type
interface Product {
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
  description: string;
  wattage: number;
  voltage: number;
  color: string;
  material: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  favourited: boolean;
  image: string;
  sku: string;
  createdAt: any;
  updatedAt: any;
}

// Sample data to be added
const updatedData: Product[] = [
{ name: "Lighting Product 21", favourited: true, price: 131, discount: 48, tags: ['Reading', 'Lighting'], desc: "Stylish and modern design", weight: 54, voltage: 220, color: "Silver", material: "Aluminum", dimensions: [17, 25, 24], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku021", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 9 },
{ name: "Lighting Product 22", favourited: false,price: 144, discount: 23, tags: ['Office', 'Lighting'], desc: "LED light for various spaces", weight: 49, voltage: 220, color: "Green", material: "Steel", dimensions: [18, 29, 25], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku022", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 12 },
{ name: "Lighting Product 23", favourited: true,price: 144, discount: 18, tags: ['Bedroom', 'Lighting'], desc: "Energy efficient lighting", weight: 43, voltage: 220, color: "Blue", material: "Acrylic", dimensions: [16, 25, 26], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku023", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 44 },
{ name: "Lighting Product 21", favourited: false, price: 131, discount: 48, tags: ['Reading', 'Lighting'], desc: "Stylish and modern design", weight: 54, voltage: 220, color: "Silver", material: "Aluminum", dimensions: [17, 25, 24], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku021", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 9 },
{ name: "Lighting Product 22", favourited: true,price: 144, discount: 23, tags: ['Office', 'Lighting'], desc: "LED light for various spaces", weight: 49, voltage: 220, color: "Green", material: "Steel", dimensions: [18, 29, 25], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku022", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 12 },
{ name: "Lighting Product 23", favourited: false, price: 144, discount: 18, tags: ['Bedroom', 'Lighting'], desc: "Energy efficient lighting", weight: 43, voltage: 220, color: "Blue", material: "Acrylic", dimensions: [16, 25, 26], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku023", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 44 },
{ name: "Lighting Product 24", favourited: true,price: 159, discount: 27, tags: ['Desk', 'LED'], desc: "Minimalist LED light", weight: 41, voltage: 220, color: "Black", material: "Plastic", dimensions: [19, 21, 27], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku024", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 33 },
{ name: "Lighting Product 25", favourited: false,price: 138, discount: 35, tags: ['Living Room', 'Decor'], desc: "Modern pendant lighting", weight: 46, voltage: 220, color: "Gold", material: "Metal", dimensions: [20, 30, 23], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku025", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 7 },
{ name: "Lighting Product 26", favourited: true,price: 129, discount: 20, tags: ['Outdoor', 'Lighting'], desc: "Weather-resistant exterior light", weight: 45, voltage: 220, color: "Grey", material: "Stainless Steel", dimensions: [15, 24, 20], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku026", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 29 },
{ name: "Lighting Product 27", favourited: false,price: 112, discount: 19, tags: ['Study', 'LED'], desc: "Bright adjustable lamp", weight: 44, voltage: 220, color: "White", material: "Aluminum", dimensions: [18, 26, 28], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku027", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 26 },
{ name: "Lighting Product 28", favourited: true,price: 140, discount: 24, tags: ['Kitchen', 'Lighting'], desc: "Under-cabinet lighting strip", weight: 47, voltage: 220, color: "Chrome", material: "Plastic", dimensions: [16, 23, 22], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku028", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 13 },
{ name: "Lighting Product 29", favourited: false,price: 125, discount: 22, tags: ['Bathroom', 'Lighting'], desc: "Soft glow LED light", weight: 42, voltage: 220, color: "Silver", material: "Acrylic", dimensions: [14, 21, 19], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku029", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 38 },
{ name: "Lighting Product 30", favourited: true,price: 149, discount: 29, tags: ['Decorative', 'Pendant'], desc: "Elegant decorative light", weight: 40, voltage: 220, color: "Rose Gold", material: "Glass", dimensions: [17, 20, 22], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku030", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 19 },
{ name: "Lighting Product 31",favourited: false, price: 118, discount: 17, tags: ['Hallway', 'Lighting'], desc: "Slim wall-mounted fixture", weight: 45, voltage: 220, color: "Matte Black", material: "Metal", dimensions: [19, 19, 18], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku031", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 14 },
{ name: "Lighting Product 32", favourited: true,price: 153, discount: 31, tags: ['Bedroom', 'LED'], desc: "Warm bedside lamp", weight: 41, voltage: 220, color: "Ivory", material: "Wood", dimensions: [20, 25, 21], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku032", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 11 },
{ name: "Lighting Product 33", favourited: false,price: 136, discount: 25, tags: ['Garage', 'Utility'], desc: "Heavy-duty shop light", weight: 47, voltage: 220, color: "Gray", material: "Steel", dimensions: [22, 30, 23], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku033", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 36 },
{ name: "Lighting Product 34", favourited: true,price: 110, discount: 12, tags: ['Closet', 'Motion'], desc: "Motion-sensor LED strip", weight: 39, voltage: 220, color: "White", material: "Plastic", dimensions: [12, 18, 15], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku034", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 45 },
{ name: "Lighting Product 35", favourited: false,price: 147, discount: 21, tags: ['Table', 'Lamp'], desc: "Adjustable table lamp", weight: 43, voltage: 220, color: "Black", material: "Aluminum", dimensions: [21, 27, 24], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku035", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 28 },
{ name: "Lighting Product 36", favourited: true,price: 134, discount: 16, tags: ['Garden', 'Lighting'], desc: "Solar-powered path light", weight: 46, voltage: 220, color: "Bronze", material: "Metal", dimensions: [15, 21, 19], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku036", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 20 },
{ name: "Lighting Product 37", favourited: false,price: 128, discount: 30, tags: ['Ceiling', 'LED'], desc: "Flush mount ceiling light", weight: 44, voltage: 220, color: "Nickel", material: "Plastic", dimensions: [20, 28, 25], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku037", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 42 },
{ name: "Lighting Product 38", favourited: true,price: 145, discount: 26, tags: ['Wall', 'Decor'], desc: "Decorative sconce light", weight: 40, voltage: 220, color: "Copper", material: "Metal", dimensions: [18, 24, 20], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku038", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 37 },
{ name: "Lighting Product 39", favourited: false,price: 139, discount: 34, tags: ['Pendant', 'Chandelier'], desc: "Elegant chandelier for dining", weight: 48, voltage: 220, color: "Gold", material: "Crystal", dimensions: [25, 32, 28], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku039", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 24 },
{ name: "Lighting Product 40", favourited: true,price: 151, discount: 22, tags: ['Kids', 'Room'], desc: "Fun kids room lamp", weight: 41, voltage: 220, color: "Yellow", material: "Plastic", dimensions: [19, 23, 20], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku040", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 10 },
{ name: "Lighting Product 1", favourited: false,price: 100, discount: 14, tags: ["Bathroom", "Lighting"], desc: "LED bathroom light", weight: 35, voltage: 220, color: "White", material: "Plastic", dimensions: [16, 26, 26], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku001", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 12 },
  { name: "Lighting Product 2", favourited: true,price: 110, discount: 38, tags: ["Outdoor", "Lighting"], desc: "Solar powered garden light", weight: 50, voltage: 220, color: "Green", material: "Steel", dimensions: [17, 27, 27], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku002", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 26 },
  { name: "Lighting Product 3", favourited: false,price: 120, discount: 26, tags: ["Living Room", "Lighting"], desc: "Stylish chandelier for living room", weight: 60, voltage: 220, color: "Black", material: "Wood", dimensions: [18, 28, 28], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku003", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 39 },
  { name: "Lighting Product 4", favourited: true,price: 130, discount: 47, tags: ["Office", "Lighting"], desc: "Modern office LED light", weight: 40, voltage: 220, color: "Silver", material: "Aluminum", dimensions: [19, 29, 29], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku004", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 45 },
  { name: "Lighting Product 5", favourited: false,price: 95, discount: 10, tags: ["Kitchen", "Lighting"], desc: "Under cabinet light", weight: 30, voltage: 220, color: "Warm White", material: "Plastic", dimensions: [14, 24, 24], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku005", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 22 },
  { name: "Lighting Product 6", favourited: true,price: 140, discount: 22, tags: ["Bedroom", "Lighting"], desc: "Wall sconce with dimmer", weight: 42, voltage: 220, color: "Bronze", material: "Metal", dimensions: [15, 25, 25], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku006", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 34 },
  { name: "Lighting Product 7", favourited: false,price: 85, discount: 19, tags: ["Stairs", "Lighting"], desc: "Motion sensor stair light", weight: 28, voltage: 220, color: "Cool White", material: "Plastic", dimensions: [13, 23, 23], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku007", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 15 },
  { name: "Lighting Product 8", favourited: true,price: 150, discount: 30, tags: ["Garage", "Lighting"], desc: "Heavy-duty garage LED", weight: 55, voltage: 220, color: "White", material: "Steel", dimensions: [20, 30, 30], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku008", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 48 },
  { name: "Lighting Product 9", favourited: false,price: 75, discount: 12, tags: ["Porch", "Lighting"], desc: "Vintage porch lantern", weight: 33, voltage: 220, color: "Black", material: "Metal", dimensions: [12, 22, 22], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku009", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 19 },
  { name: "Lighting Product 10", favourited: true,price: 105, discount: 18, tags: ["Hallway", "Lighting"], desc: "Recessed hallway lighting", weight: 38, voltage: 220, color: "White", material: "Plastic", dimensions: [16, 26, 26], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku010", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 33 },
  { name: "Lighting Product 11", favourited: false,price: 115, discount: 25, tags: ["Ceiling", "Lighting"], desc: "Ceiling-mounted LED light", weight: 36, voltage: 220, color: "Warm White", material: "Acrylic", dimensions: [16, 26, 26], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku011", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 27 },
  { name: "Lighting Product 12", favourited: true,price: 98, discount: 17, tags: ["Reading", "Lighting"], desc: "Adjustable reading light", weight: 25, voltage: 220, color: "Silver", material: "Metal", dimensions: [12, 22, 22], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku012", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 44 },
  { name: "Lighting Product 13", favourited: false,price: 132, discount: 29, tags: ["Kids Room", "Lighting"], desc: "Fun shaped ceiling light", weight: 29, voltage: 220, color: "Blue", material: "Plastic", dimensions: [18, 28, 28], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku013", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 41 },
  { name: "Lighting Product 14", favourited: true,price: 160, discount: 31, tags: ["Vanity", "Lighting"], desc: "Vanity mirror light kit", weight: 43, voltage: 220, color: "White", material: "Glass", dimensions: [15, 25, 25], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku014", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 37 },
  { name: "Lighting Product 15", favourited: false,price: 87, discount: 21, tags: ["Garden", "Lighting"], desc: "LED garden path light", weight: 31, voltage: 220, color: "Green", material: "Plastic", dimensions: [13, 23, 23], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku015", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 28 },
  { name: "Lighting Product 16", favourited: true,price: 145, discount: 36, tags: ["Accent", "Lighting"], desc: "Color changing accent light", weight: 39, voltage: 220, color: "RGB", material: "Glass", dimensions: [19, 29, 29], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku016", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 31 },
  { name: "Lighting Product 17", pfavourited: false,rice: 155, discount: 33, tags: ["Pendant", "Lighting"], desc: "Industrial pendant light", weight: 46, voltage: 220, color: "Black", material: "Steel", dimensions: [20, 30, 30], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku017", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 42 },
  { name: "Lighting Product 18", favourited: true,price: 123, discount: 27, tags: ["Desk", "Lighting"], desc: "Clamp-on desk lamp", weight: 26, voltage: 220, color: "White", material: "Aluminum", dimensions: [12, 22, 22], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku018", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 21 },
  { name: "Lighting Product 19", favourited: false,price: 108, discount: 24, tags: ["Closet", "Lighting"], desc: "Motion sensor closet light", weight: 22, voltage: 220, color: "Neutral White", material: "Plastic", dimensions: [11, 21, 21], offer: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku019", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 36 },
  { name: "Lighting Product 20", favourited: true,price: 90, discount: 15, tags: ["Entryway", "Lighting"], desc: "Entryway flush mount light", weight: 34, voltage: 220, color: "Warm White", material: "Metal", dimensions: [14, 24, 24], offer: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku020", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), qty: 29 }

];


const BatchAddProducts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const batchAddProducts = async (): Promise<void> => {
    setLoading(true);
    const batch = writeBatch(db);

    const productsRef = collection(db, "lighting"); // Reference to the "lighting" collection

    // Loop through the products and create add data
    updatedData.forEach((data, index) => {
      const productRef = doc(productsRef, `sku${index + 1}`); // Assuming SKU is used as document ID (sku1, sku2, ..., sku50)
      batch.set(productRef, {
        ...data,
        image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", // Add image URL
        createdAt: serverTimestamp(), // Add created timestamp
        updatedAt: serverTimestamp(), // Add updated timestamp
      });
    });

    try {
      // Commit the batch add
      await batch.commit();
      console.log("Batch add successful!");
    } catch (error) {
      setError("Error performing batch add");
      console.error("Error performing batch add:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={batchAddProducts} disabled={loading}>
        {loading ? 'Adding products...' : 'Add Products to Firestore'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BatchAddProducts;
