import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function OwnerUpload() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    try {
      await axios.post("http://localhost:3000/upload", formData);
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-800">
  <form 
    onSubmit={handleSubmit(onSubmit)} 
    className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center space-y-4"
  >
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
    
    <input 
      {...register("name")} 
      placeholder="Image name" 
      className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    /><br />

    <input 
      {...register("image")} 
      type="file" 
      className="w-full text-sm text-gray-700"
    /><br />

    <button 
      type="submit" 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
    >
      Upload
    </button>
  </form>
</div>

  );
}

export default OwnerUpload;
