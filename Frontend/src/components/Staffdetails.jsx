import React from 'react'

function Staffdetails() {
 
    return (
      <div className=" p-10 rounded-lg my-5">
        <h1 className="text-3xl font-bold text-center">Institute Information</h1>
        <hr className="my-4 border-gray-700" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 flex justify-center">
            <img src="logo.png" alt="Ranking" className="w-3/4 md:w-1/2" />
          </div>
          <div className=" w-90 md:w-1/2 grid grid-cols-2 gap-6 mt-6 md:mt-0">
            <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src="/staff/department.png" alt="Department" className="w-16 h-16 mb-2" />
              <span className="text-2xl font-bold">5+</span>
              <p>Subject</p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src="/staff/student-icon.png" alt="Students" className="w-16 h-16 mb-2" />
              <span className="text-2xl font-bold">100+</span>
              <p>Students</p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src="/staff/faculty.png" alt="Faculty" className="w-16 h-16 mb-2" />
              <span className="text-2xl font-bold">10+</span>
              <p>Faculty</p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src="/staff/staff.png" alt="Staff" className="w-16 h-16 mb-2" />
              <span className="text-2xl font-bold">5+</span>
              <p>Staff</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  


export default Staffdetails
