import React, { useEffect, useState } from 'react';

function Board() {
  const [provide, setProvide] = useState([]);

  useEffect(() => {
    fetch('/Class12.json')
      .then((res) => res.json())
      .then((data) => setProvide(data));
  }, []);

  return (
    <>
      <div className="mt-15 px-2 py-4 bg-amber-200">
  <h1 className="text-2xl font-bold text-black text-center mb-2">
    Our Class 12 Result
  </h1>
  <div className="flex flex-nowrap overflow-x-auto gap-1 sm:gap-3 px-0 sm:px-2 sm:mx-15">
    {provide.map((item) => (
      <div
        key={item.id}
        className="bg-amber-50 text-black w-55 sm:w-70 flex-shrink-0 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col"
      >
        <figure className="px-0 pt-0 sm:px-2 sm:pt-2">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-md object-cover object-top mt-2 mb-4 w-50 h-70 ml-2  h-14 sm:h-90 sm:w-63 "
          />
        </figure>
        
      </div>
    ))}
  </div>
</div>
    </>
  );
}

export default Board;
