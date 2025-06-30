import React from 'react'


import Navbar from '../components/Navbar'
import Banner from "../components/Banner"  
import Footer from "../components/Footer"  
import Weprovide from "../components/Weprovide"  
import Academics from "../components/Academics"  
import Staffdetails from '../components/Staffdetails'
import Filterphoto from '../components/Filterphoto'
import Slider from '../components/Slider'
function Home() {
  

  return (
    <>
    <Navbar/>
    <Slider/>
    <Banner/>
    <Weprovide/>
    <Academics/>
    <Staffdetails/>
<Filterphoto/>
    <Footer/>
    
    </>
  )
}

export default Home

