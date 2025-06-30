import React, { useEffect, useState } from "react";
import axios from "axios";

function Filterphoto() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/images")
      .then(res => setImages(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="mt-20 mx-5 sm:mx-15 ">
        <h1 className="font-bold text-center text-3xl mb-6">Photo Gallery</h1>
        <div className="flex flex-wrap gap-4  sm:p-4 ">
          {images.slice(0, 12).map((img, index) => (
            <div key={index}>
              <img
                src={`data:${img.image.contentType};base64,${btoa(
                  new Uint8Array(img.image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={img.name}
            className=" w-35 h-35 sm:w-50 sm:h-50 object-cover border rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filterphoto;
