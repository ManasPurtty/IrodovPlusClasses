import React from 'react'

function Owner() {
  return (
   <>
   <div className='mt-10'>
     <h1 className='text-center mb-8 text-2xl font-bold'>Welcome JD Sir</h1>
     <div className="flex justify-center mb-8">
       <img src="jd.png" alt="Owner" className="rounded-lg shadow-lg w-64" />
     </div>
     <div className='flex m-20'>
       <div className='w-1/2 flex flex-col items-center'>
         <a href="/ownerupload" className='bg-green-500 text-black p-3 rounded-lg'>Upload Photo</a>
       </div>
       <div className='w-1/2 flex flex-col items-center'>
         <a href="/seeenroll" className='bg-green-500 text-black p-3 rounded-lg mb-4'>See Enroll Student</a>
       </div>
     </div>
   </div>
   </>
  )
}

export default Owner