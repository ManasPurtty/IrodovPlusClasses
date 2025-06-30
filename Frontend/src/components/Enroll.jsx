import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"

function Enroll() {
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
      await axios.post("http://localhost:3000/api/enroll", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Enrollment successful");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed");
    }
  };

  return (
    <div className="flex flex-col items-center text-black bg-amber-50 mt-15">
      <div className="text-center mt-10 mb-5 text-2xl font-semibold underline underline-offset-4 text-blue-800">Enrollment Form</div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5">
        <div className="space-y-2">
          <span>Enter Your Name</span><br />
          <input
            {...register("Name", { required: true })}
            placeholder='Enter Your Name'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.Name && <span className='text-sm text-red-500'>Name is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your Father's Name</span><br />
          <input
            {...register("FatherName", { required: true })}
            placeholder='Enter Your Father Name'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.FatherName && <span className='text-sm text-red-500'>Father's Name is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your School Name</span><br />
          <input
            {...register("School", { required: true })}
            placeholder='Enter Your School Name'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.School && <span className='text-sm text-red-500'>School is required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your Address</span><br />
          <input
            {...register("Adress", { required: true })}
            placeholder='Enter Your Address'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
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
            placeholder='Enter Your Phone Number'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.Number && <span className='text-sm text-red-500'>Valid number required</span>}
        </div>

        <div className="space-y-2">
          <span>Enter Your 10th Mark in %</span><br />
          <input
            {...register("Mark", { required: true })}
            placeholder='Enter Your 10th Mark in %'
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.Mark && <span className='text-sm text-red-500'>Mark is required</span>}
        </div>
 <div className="space-y-2">
          <span>pay Rs 1000 to +91 8249687189 <br /> (Jagnnath Dutta)</span><br />
         <img src="qr.jpg" className='h-30' alt="" />
        </div>
        <div className="space-y-2">
          <span>Upload Your Payment Screenshot</span><br />
          <input
            {...register("Image", { required: true })}
            type="file"
            accept="image/*"
            className='w-80 px-3 py-1 bg-gray-300 rounded-lg'
          />
          {errors.Image && <span className='text-sm text-red-500'>Screenshot is required</span>}
        </div>

        <div className="items-center">
          <button type="submit" className='p-2 bg-blue-500 mb-10 rounded-lg hover:bg-blue-900 text-white'>Enroll</button>
        </div>
      </form>
    </div>
  )
}

export default Enroll;
