import React, { useEffect, useState } from 'react'
import Login from './Login';
function Navbar() {
    const [sticky,setsticky]=useState(false);
    useEffect(()=>{
         const handlescroll=()=>{
            if(window.scrollY>0){
                setsticky(true)
            }else{
                setsticky(false)
            }
         }
         window.addEventListener('scroll',handlescroll)
         return ()=>{
            window.removeEventListener('scroll',handlescroll)
         }
    },[])


    const navitems=(
    <>
    <li><a href='/'>Home</a></li>
        <li><a href='/result'>Result</a></li>
        <li><a href='/enroll'>Enroll</a></li>
        <li><a href='/contact'>Contact</a></li>
      <li><a href='/about'>About us</a></li>
    </>)
  return (
    <div className={`max-w-screen-2xl container bg-gray-900 mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 ${
        sticky
        ?"stack-navbar shadow-md bg-base-200 duration-100 transition-all ease-in-out":""
    }`}>
      <div className="navbar shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navitems}
      </ul>
    </div>
          <img className='w-10 ' src="/logo.png" alt="" />

    <a className=" text-sm sm:text-xl font-bold">Irodov + Classes</a>
  </div>
  
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navitems}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn rounded-lg"
    onClick={()=> document.getElementById('my_modal_3').showModal()}
    >Login</a>
  <Login/>
  </div>
</div>
</div>
   
  );
}

export default Navbar
