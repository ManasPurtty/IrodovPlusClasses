import React from 'react'
import { useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

    const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm();
  const onSubmit=(data)=>{
    axios.post('http://localhost:3000/owners/login',{
      email:data.email,
      password:data.password
    })
    .then(result=>{
      console.log(result)
      if(result.data==="Success"){
        navigate('/owner')
      }
    })

  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
     
      {/* if there is a button in form, it will close the modal */}
    <Link
    to="/"
    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    onClick={()=>document.getElementById("my_modal_3").close()}
    >
       ✕
    </Link>
     
    
    <h3 className="font-bold text-lg">Login</h3>
<div className='mt-5 space-y-2'>
    <span>
        Email
    </span><br />


    <input {...register("email", { required: true })} 
   
   type="email" placeholder='enter your email' className='w-80 px-3 rounded-md outline-none py-1 border-2' />
    <br />  {errors.email && <span className='text-sm text-red-500' >This field is required</span>}

</div>
<div className='mt-5 space-y-2'>
    <span>
        Password
    </span><br />
    <input {...register("password", { required: true })} 
    type="password" placeholder='enter your Password' className='w-80 px-3 rounded-md outline-none py-1 border-2' />
    <br />  {errors.password && <span  className='text-sm text-red-500'>This field is required</span>}
</div>

<div className='mt-5'>
    <button className='p-2 bg-blue-700 rounded-lg hover:bg-blue-900'>Login</button>
    
</div>
</form>
  </div>
</dialog>
    </div>
  )
}

export default Login
