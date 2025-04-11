import React from 'react'
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Laptopgrid from './Laptop/Laptopgrid'
import Laptopfiltering from './Laptop/laptopfitering'
import Laptopcategoryposter from './Laptop/Laptopcategoryposter'


export default function Laptopcategorypage() {
  return (
    <div>
      <Navbar></Navbar>
      <Laptopcategoryposter></Laptopcategoryposter>
      
      

      
      <p className='ml-52 mt-5 mb-[-26px] text-l font-semibold'>All Laptops</p>
      
      <Laptopfiltering></Laptopfiltering>

      <Laptopgrid></Laptopgrid>
            
    
    
          
    </div>
  )
}
