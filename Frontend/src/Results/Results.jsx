import React from 'react'
import Result from '../components/Result'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Results() {
  return (
    <div>
      <Navbar/>
      <div className='min-h-screen'>
       <Result/>
      </div>
     
      <Footer/>
    </div>
  )
}

export default Results
