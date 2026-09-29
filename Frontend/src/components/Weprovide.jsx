import React, { useEffect, useState } from 'react';

function Weprovide() {
  const [provide, setProvide] = useState([]);

  useEffect(() => {
    fetch('/provide.json')
      .then((res) => res.json())
      .then((data) => setProvide(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="mt-15">
        <h1 className="text-3xl font-bold text-center mb-8 mx-auto">We Provide</h1>

        <div className="flex flex-wrap mx-5 gap-4 sm:gap-6 justify-center">
          {provide.map((item) => (
            <div
              className="card bg-amber-50 text-black w-40 sm:w-80 md:w-96 min-h-[320px] shadow-sm"
              key={item.id}
            >
              <figure className="px-6 pt-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 sm:h-48 object-contain rounded-xl"
                />
              </figure>

              <div className="card-body items-center text-center pt-4">
                <h2 className="card-title text-lg sm:text-2xl">{item.name}</h2>
                <p className="text-sm sm:text-xl">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Weprovide;
