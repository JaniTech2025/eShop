import { useState } from "react";
import { db } from "../config/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Define the Product type
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
  favourited: boolean,
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  image: string;
  sku: string;
  createdAt: any;
  updatedAt: any;
}

export default function AddProductForm() {
  const [form, setForm] = useState<Product>({
    name: "",
    // brand: "",
    price: 300,
    inStock: true, // default to true for the checkbox
    categories: [],
    description: "",
    wattage: 40,
    voltage: 40,
    color: "Gold",
    material: "Nickel",
    favourited: false,
    dimensions: {
      height: 10,
      width: 19,
      depth: 10
    },
    image: "",
    sku: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { name, value, type, checked } = e.target;
    if (name === "categories") {
      // Handle categories as a comma-separated list
      setForm(prev => ({
        ...prev,
        categories: value.split(",").map(cat => cat.trim())
      }));
    } else if (name === "inStock" || name === "favourited") {
    setForm(prev => ({
      ...prev,
      [name]: checked
    }));
    } else if (["height", "width", "depth"].includes(name)) {
      // Handle dimensions as individual fields
      setForm(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [name]: Number(value)
        }
      }));
    } else {
      // Default case for all other inputs
      setForm(prev => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      ...form,
      updatedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "lighting"), product);
      alert("Product added successfully!");
      setForm({
        name: "",
        // brand: "",
        price: 0,
        inStock: true,
        categories: [],
        description: "",
        wattage: 40,
        voltage: 40,
        color: "",
        material: "",
        dimensions: { height: 0, width: 0, depth: 0 },
        favourited: false,
        image: "",
        sku: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: "400px" }}>
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      {/* <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      /> */}
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      {/* <label> */}
        <input
          name="inStock"
          type="checkbox"
          checked={form.inStock}
          onChange={handleChange}
        />
        {/* In Stock
      </label> */}
      <input
        name="categories"
        placeholder="Categories (comma separated)"
        value={form.categories.join(", ")}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="wattage"
        type="number"
        placeholder="Wattage"
        value={form.wattage}
        onChange={handleChange}
      />
      <input
        name="voltage"
        type="number"
        placeholder="Voltage"
        value={form.voltage}
        onChange={handleChange}
      />
      <input
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
      />
      <input
        name="material"
        placeholder="Material"
        value={form.material}
        onChange={handleChange}
      />
        <input
          name="favourited"
          type="checkbox"
          checked={form.favourited}
          onChange={handleChange}
        />
      <input
        name="height"
        type="number"
        placeholder="Height (cm)"
        value={form.dimensions.height}
        onChange={handleChange}
      />
      <input
        name="width"
        type="number"
        value={form.dimensions.width}
        placeholder="Width (cm)"
        onChange={handleChange}
      />
      <input
        name="depth"
        type="number"
        placeholder="Depth (cm)"
        value={form.dimensions.depth}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />
      <input
        name="sku"
        placeholder="SKU"
        value={form.sku}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
