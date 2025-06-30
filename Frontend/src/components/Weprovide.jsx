import React, { useEffect, useState } from 'react';

function Weprovide() {
  const [provide, setProvide] = useState([]);

  useEffect(() => {
    fetch('/provide.json')
      .then((res) => res.json())
      .then((data) => setProvide(data));
  }, []);

  return (
   <>
  <div className="mt-15 ">
    <h1 className="text-3xl font-bold text-center mb-8 mx-auto">We Provide</h1>
    <div className="flex  mx-5 gap-2 sm:gap-6 justify-center">
      {provide.map((item) => (
        <div className="card bg-amber-50 text-black  w-35 h-60 sm:w-96 shadow-sm" key={item.id}>
          <figure className="px-10 pt-10">
            <img
              src={item.image}
              alt={item.title}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title sm:text-2xl">{item.name}</h2>
            <p className='sm:text-xl'>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
}

export default Weprovide;