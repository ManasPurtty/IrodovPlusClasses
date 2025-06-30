import React, { useEffect, useState } from 'react';

function Nit() {
  const [provide, setProvide] = useState([]);

  useEffect(() => {
    fetch('/nit.json')
      .then((res) => res.json())
      .then((data) => setProvide(data));
  }, []);

  return (
    <>
      <div className="mt-15 px-2 py-4 bg-amber-200">
  <h1 className="text-2xl font-bold text-black text-center mb-2">
    Our JEE Result
  </h1>
  <div className="flex flex-nowrap overflow-x-auto gap-1 sm:gap-3 px-0 sm:px-2 sm:mx-15">
    {provide.map((item) => (
      <div
        key={item.id}
        className="bg-amber-50 text-black w-28 sm:w-64 flex-shrink-0 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col"
      >
        <figure className="px-0 pt-0 sm:px-2 sm:pt-2">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-md object-cover object-top mt-2 ml-4 w-20  h-14 sm:h-44 sm:w-52 "
          />
        </figure>
        <div className="px-1 py-1 sm:px-4 sm:py-3 text-center">
          <h2 className="font-semibold text-xs sm:text-xl">{item.name}</h2>
          <p className="text-[10px] sm:text-sm text-gray-800">{item.title}</p>
          <p className="text-[10px] sm:text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
}

export default Nit;
