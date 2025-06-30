import { useState } from 'react'
import React from 'react'
import './App.css'
import Home from './Home/Home'
import { Routes,Route } from "react-router-dom"
import Results from './Results/Results'
import Aboutus from './Aboutus/Aboutus'
import Contactus from './Contactus/Contactus'
import Enrolls from './components/Enrolls/Enrolls'
import Owner from './components/owner'
import OwnerUpload from "./components/OwnerUpload";
import ViewEnrollments from './components/ViewEnrollments'

function App() {
  

  return (
    <>
  
    
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/result" element={<Results/>}/>
  <Route path="/about" element={<Aboutus/>}/>
  <Route path="/contact" element={<Contactus/>}/>
  <Route path="/enroll" element={<Enrolls/>}/>
  <Route path="/owner" element={<Owner/>}/>
  <Route path="/ownerupload" element={<OwnerUpload/>}/>
  <Route path="/seeenroll" element={<ViewEnrollments/>}/>
 
  
</Routes>

    </>
  )
}

export default App


