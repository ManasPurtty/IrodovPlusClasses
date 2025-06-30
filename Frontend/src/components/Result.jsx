import React from 'react'
import PhotoGallery from "./PhotoGallery";
import Nit from './Results/Nit';
import Ojee from './Results/Ojee';
import Board from './Results/Board';

function Result() {
  return (
    <>
    <Nit/>
    <Ojee/>
    <Board/>
    <div>

 <PhotoGallery/>

    </div>
    </>
  )
}

export default Result
