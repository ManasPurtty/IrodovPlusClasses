import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PhotoGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("API URL:", API_URL);

    axios
      .get(`${API_URL}/images`)
      .then((res) => {
        console.log("Images response:", res.data);
        setImages(res.data);
      })
      .catch((err) => {
        console.log("Gallery fetch error:", err);
      });
  }, []);

  return (
    <div className="mt-20 sm:mx-20">
      <h1 className="text-bold text-center text-3xl">Photo Gallery</h1>

      <div className="flex flex-wrap gap-4 mx-10 sm:p-4">
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={`data:${img.image.contentType};base64,${btoa(
                new Uint8Array(img.image.data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt={img.name || "gallery"}
              className="w-50 h-50 object-cover border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
