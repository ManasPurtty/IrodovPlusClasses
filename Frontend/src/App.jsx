import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Results from './Results/Results';
import Aboutus from './Aboutus/Aboutus';
import Contactus from './Contactus/Contactus';
import Enrolls from './components/Enrolls/Enrolls';
import Owner from './components/owner';
import OwnerUpload from './components/OwnerUpload';
import ViewEnrollments from './components/ViewEnrollments';
import Success from './components/Sucess';
import Resources from './components/Resources';
import OwnerResourceUpload from './components/OwnerResourceUpload';
import ViewStudents from './components/ViewStudents';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/result" element={<Results />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/enroll" element={<Enrolls />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/ownerupload" element={<OwnerUpload />} />
        <Route path="/owner/resources" element={<OwnerResourceUpload />} />
        <Route path="/owner/students" element={<ViewStudents />} />
        <Route path="/seeenroll" element={<ViewEnrollments />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
