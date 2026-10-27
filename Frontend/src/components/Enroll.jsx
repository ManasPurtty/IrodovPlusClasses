import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

function Enroll() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('studentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const checkAuth = () => {
      const saved = localStorage.getItem('studentUser');
      setStudent(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('studentAuthChange', checkAuth);
    return () => window.removeEventListener('studentAuthChange', checkAuth);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.Name);
    formData.append("fatherName", data.FatherName);
    formData.append("school", data.School);
    formData.append("address", data.Adress);
    formData.append("number", data.Number);
    formData.append("mark", data.Mark);
    formData.append("image", data.Image[0]);

    try {
      await axios.post(`${API_BASE_URL}/api/enroll`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed");
    }
  };

  // If student is not logged in or registered, show login requirement prompt
  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] bg-amber-50 mt-15 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200 my-10">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Login Required</h2>
          <p className="text-sm text-gray-600 mb-6">
            The course enrollment form is only accessible to registered students. Please log in or create an account to proceed with your enrollment.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById('my_modal_3')?.showModal()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow cursor-pointer transition duration-150"
          >
            Login / Register to Enroll
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-black bg-amber-50 mt-15 py-8">
      <div className="text-center mt-6 mb-2 text-2xl font-semibold underline underline-offset-4 text-blue-800">
        Course Enrollment Form
      </div>
      <p className="text-xs text-gray-600 mb-6">
        Logged in as <span className="font-semibold text-blue-700">{student.fullname}</span> ({student.email})
      </p>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 w-full max-w-md">
        <div className="space-y-2">
          <span>Enter Your Name</span><br />
          <input
            {...register("Name", { required: true })}
            defaultValue={student.fullname || ''}
            placeholder='Enter Your Name'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.Name && <span className='text-sm text-red-500'>Name is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your Father's Name</span><br />
          <input
            {...register("FatherName", { required: true })}
            placeholder='Enter Your Father Name'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.FatherName && <span className='text-sm text-red-500'>Father's Name is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your School Name</span><br />
          <input
            {...register("School", { required: true })}
            placeholder='Enter Your School Name'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.School && <span className='text-sm text-red-500'>School is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your Address</span><br />
          <input
            {...register("Adress", { required: true })}
            placeholder='Enter Your Address'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.Adress && <span className='text-sm text-red-500'>Address is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your Phone Number</span><br />
          <input
            {...register("Number", {
              required: true,
              pattern: /^[0-9]{10}$/
            })}
            defaultValue={student.phone || ''}
            placeholder='Enter 10-digit Phone Number'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.Number && <span className='text-sm text-red-500'>Valid 10-digit number required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your 10th Mark in %</span><br />
          <input
            {...register("Mark", { required: true })}
            placeholder='Enter Your 10th Mark in %'
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm'
          />
          {errors.Mark && <span className='text-sm text-red-500'>Mark is required</span>}
        </div>

        <div className="space-y-2 border-t border-gray-200 pt-4">
          <span className="font-semibold text-gray-700">Pay Rs 1000 to +91 8249687189 <br /> (Jagannath Dutta)</span><br />
          <img src="/qr.jpg" className='h-36 rounded-lg border my-2' alt="UPI QR Code" />
        </div>

        <div className="space-y-2">
          <span>Upload Your Payment Screenshot</span><br />
          <input
            {...register("Image", { required: true })}
            type="file"
            accept="image/*"
            className='w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:text-xs'
          />
          {errors.Image && <span className='text-sm text-red-500'>Payment screenshot is required</span>}
        </div>

        <div className="pt-2">
          <button type="submit" className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow cursor-pointer transition'>
            Submit Enrollment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Enroll;
