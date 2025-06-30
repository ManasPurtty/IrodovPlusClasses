import React from 'react'

function Contact() {
  return (
   <>
   
    <div  style={{ paddingTop: "154px" }} className="bg-[#fdf8f4] min-h-screen p-8 flex flex-col items-center mb-0">
      <h1 className="text-4xl font-bold text-black mb-12">Contact us</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* Contact Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
          <div className="text-4xl mb-4 flex items-center justify-center">
            <img className='h-32' src="map.png" alt="" />
          </div>
          <h2 className="text-black text-xl font-semibold mb-2">Irodov Plus Classes</h2>
          <p className="text-blue-600 mb-6">
At - kolho sahi, debendrapur road, near autonomous college, baripada, 757003          </p>
          
        </div>

        {/* Help Center Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
          <div className="text-4xl mb-4 flex items-center justify-center">
<img src="call.png" className='h-32' alt="" />
          </div>
          <h2 className="text-xl text-black font-semibold mb-2">Ph.: +91 85960 64667</h2>
          <p className="text-blue-600 mb-6">
       Email: rjdutta.91@gmail.com
          </p>
         
        </div>
      </div>
    </div>
  

   
   </>
  )
}

export default Contact
