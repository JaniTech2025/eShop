import React, { useState } from "react";
import { uploadToCloudinary } from "../services/uploadToCloudinary";
import { db } from "../config/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const imageUrl = await uploadToCloudinary(file);

      await addDoc(collection(db, "lighting"), {
        name: "New Fixture",
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Uploaded and saved to Firestore!");
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
