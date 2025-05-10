// BatchAddProducts.tsx (Functional Component in TypeScript)
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
{'name': 'Lighting Product 6', 'price': 160, 'inStock': true, 'categories': ['Bathroom', 'Lighting'], 'description': 'LED bathroom light', 'wattage': 35, 'voltage': 220, 'color': 'White', 'material': 'Plastic', 'dimensions': {'height': 16, 'width': 26, 'depth': 26}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku006', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 7', 'price': 170, 'inStock': false, 'categories': ['Outdoor', 'Lighting'], 'description': 'Solar powered garden light', 'wattage': 50, 'voltage': 220, 'color': 'Green', 'material': 'Steel', 'dimensions': {'height': 17, 'width': 27, 'depth': 27}, 'favourited': true, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku007', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 8', 'price': 180, 'inStock': true, 'categories': ['Living Room', 'Lighting'], 'description': 'Stylish chandelier for living room', 'wattage': 60, 'voltage': 220, 'color': 'Black', 'material': 'Wood', 'dimensions': {'height': 18, 'width': 28, 'depth': 28}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku008', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 9', 'price': 190, 'inStock': true, 'categories': ['Office', 'Lighting'], 'description': 'Modern office LED light', 'wattage': 40, 'voltage': 220, 'color': 'Silver', 'material': 'Aluminum', 'dimensions': {'height': 19, 'width': 29, 'depth': 29}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku009', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 10', 'price': 200, 'inStock': false, 'categories': ['Bedroom', 'Lighting'], 'description': 'Sleek pendant light for bedroom', 'wattage': 45, 'voltage': 220, 'color': 'White', 'material': 'Brass', 'dimensions': {'height': 20, 'width': 30, 'depth': 30}, 'favourited': true, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku010', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 11', 'price': 210, 'inStock': true, 'categories': ['Kitchen', 'Lighting'], 'description': 'Compact LED fixture for kitchen', 'wattage': 50, 'voltage': 220, 'color': 'Gray', 'material': 'Steel', 'dimensions': {'height': 21, 'width': 31, 'depth': 31}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku011', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 12', 'price': 220, 'inStock': false, 'categories': ['Lighting'], 'description': 'Vintage-style chandelier', 'wattage': 55, 'voltage': 220, 'color': 'Gold', 'material': 'Brass', 'dimensions': {'height': 22, 'width': 32, 'depth': 32}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku012', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 13', 'price': 230, 'inStock': true, 'categories': ['Lighting'], 'description': 'Outdoor LED lights for garden', 'wattage': 60, 'voltage': 220, 'color': 'Silver', 'material': 'Iron', 'dimensions': {'height': 23, 'width': 33, 'depth': 33}, 'favourited': true, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku013', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 14', 'price': 240, 'inStock': false, 'categories': ['Living Room', 'Lighting'], 'description': 'LED ceiling fixture for living room', 'wattage': 65, 'voltage': 220, 'color': 'Copper', 'material': 'Plastic', 'dimensions': {'height': 24, 'width': 34, 'depth': 34}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku014', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 15', 'price': 250, 'inStock': true, 'categories': ['Lighting'], 'description': 'LED floor lamp for living room', 'wattage': 75, 'voltage': 220, 'color': 'Black', 'material': 'Wood', 'dimensions': {'height': 25, 'width': 35, 'depth': 35}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku015', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 16', 'price': 260, 'inStock': false, 'categories': ['Lighting'], 'description': 'Adjustable desk light', 'wattage': 45, 'voltage': 220, 'color': 'Silver', 'material': 'Plastic', 'dimensions': {'height': 26, 'width': 36, 'depth': 36}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku016', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 17', 'price': 270, 'inStock': true, 'categories': ['Lighting'], 'description': 'Sleek LED pendant light', 'wattage': 40, 'voltage': 220, 'color': 'Gray', 'material': 'Aluminum', 'dimensions': {'height': 27, 'width': 37, 'depth': 37}, 'favourited': true, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku017', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 18', 'price': 280, 'inStock': false, 'categories': ['Lighting'], 'description': 'Smart light with adjustable brightness', 'wattage': 50, 'voltage': 220, 'color': 'Gold', 'material': 'Plastic', 'dimensions': {'height': 28, 'width': 38, 'depth': 38}, 'favourited': true, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku018', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
{'name': 'Lighting Product 19', 'price': 290, 'inStock': true, 'categories': ['Lighting'], 'description': 'Decorative lighting for hallway', 'wattage': 60, 'voltage': 220, 'color': 'Copper', 'material': 'Steel', 'dimensions': {'height': 29, 'width': 39, 'depth': 39}, 'favourited': false, 'image': 'https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp', 'sku': 'sku019', 'createdAt': serverTimestamp(), 'updatedAt': serverTimestamp()},
 { name: "LED Ceiling Light", price: 350, inStock: true, categories: ["Lighting"], description: "Bright LED light fixture for living room", wattage: 40, voltage: 220, color: "Gold", material: "Aluminum", dimensions: { height: 10, width: 30, depth: 30 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku001", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Modern Outdoor LED", price: 180, inStock: true, categories: ["Outdoor", "Lighting"], description: "Modern outdoor LED lighting", wattage: 50, voltage: 220, color: "Silver", material: "Plastic", dimensions: { height: 12, width: 35, depth: 35 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku002", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Compact Kitchen Light", price: 210, inStock: true, categories: ["Kitchen", "Lighting"], description: "Compact LED fixture for kitchens", wattage: 35, voltage: 220, color: "White", material: "Plastic", dimensions: { height: 8, width: 25, depth: 25 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku003", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Pendant Dining Light", price: 240, inStock: true, categories: ["Dining", "Lighting"], description: "Sleek pendant light for dining areas", wattage: 45, voltage: 220, color: "Black", material: "Iron", dimensions: { height: 15, width: 40, depth: 40 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku004", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Energy-Efficient Light", price: 150, inStock: true, categories: ["Lighting"], description: "Energy-efficient light fixture", wattage: 30, voltage: 220, color: "Bronze", material: "Steel", dimensions: { height: 10, width: 30, depth: 30 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku005", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Smart LED Light", price: 190, inStock: true, categories: ["Lighting", "Smart"], description: "Smart LED light fixture with dimming", wattage: 50, voltage: 220, color: "Copper", material: "Aluminum", dimensions: { height: 10, width: 30, depth: 30 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku006", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Industrial Pendant Light", price: 220, inStock: true, categories: ["Lighting", "Industrial"], description: "Industrial pendant light", wattage: 60, voltage: 220, color: "Silver", material: "Iron", dimensions: { height: 18, width: 45, depth: 45 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku007", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Chandelier for Living Room", price: 270, inStock: true, categories: ["Living Room", "Lighting"], description: "Decorative chandelier for living room", wattage: 70, voltage: 220, color: "Crystal", material: "Glass", dimensions: { height: 25, width: 50, depth: 50 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku008", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Modern Pendant Light", price: 280, inStock: true, categories: ["Lighting"], description: "Sleek modern pendant light", wattage: 40, voltage: 220, color: "Gold", material: "Brass", dimensions: { height: 10, width: 30, depth: 30 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku009", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Vintage Wall Sconce", price: 300, inStock: true, categories: ["Lighting"], description: "Vintage-style wall sconce", wattage: 30, voltage: 220, color: "Black", material: "Iron", dimensions: { height: 20, width: 25, depth: 25 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku010", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Adjustable Spotlight", price: 220, inStock: true, categories: ["Lighting", "Spotlight"], description: "Adjustable spotlight fixture", wattage: 50, voltage: 220, color: "White", material: "Plastic", dimensions: { height: 10, width: 30, depth: 30 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku011", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "LED Office Light", price: 260, inStock: true, categories: ["Office", "Lighting"], description: "High-efficiency LED for offices", wattage: 60, voltage: 220, color: "Silver", material: "Aluminum", dimensions: { height: 15, width: 40, depth: 40 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku012", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Smart Recessed Light", price: 330, inStock: true, categories: ["Lighting", "Smart"], description: "Smart recessed lighting with app control", wattage: 45, voltage: 220, color: "Black", material: "Iron", dimensions: { height: 10, width: 35, depth: 35 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku013", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Crystal Ceiling Light", price: 400, inStock: true, categories: ["Lighting", "Luxury"], description: "Luxurious crystal ceiling light", wattage: 80, voltage: 220, color: "Crystal", material: "Glass", dimensions: { height: 20, width: 50, depth: 50 }, favourited: true, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku014", createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  { name: "Outdoor Solar Light", price: 120, inStock: true, categories: ["Outdoor", "Lighting", "Solar"], description: "Solar-powered outdoor lighting", wattage: 15, voltage: 220, color: "Green", material: "Plastic", dimensions: { height: 10, width: 30, depth: 30 }, favourited: false, image: "https://res.cloudinary.com/dwou0gtus/image/upload/v1746474283/646290_uovaf0.webp", sku: "sku015", createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
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
