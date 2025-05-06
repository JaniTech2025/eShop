import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const url = "https://api.cloudinary.com/v1_1/dwou0gtus/upload";
  const preset = "vs4pcnyp";

  const formData = new FormData();
  formData.append("file", file);
//   formData.append("upload_preset", preset);
  formData.append("preset", preset);

  const response = await axios.post(url, formData);
  return response.data.secure_url; 
};
