import React from 'react'
import './Itempage.css'
import ProductTabs from '../components/Itemdiscription'
import Itemspecs from '../components/Itemspecs'
import Itemimage from '../components/Itemimage'
import Itempath from '../components/Itempath'
import Itemrelates from '../components/Itemrelates'






export default function Itempage() {
  return (
    <div>
        <div>
        </div>

        <div className=''>
            <Itempath></Itempath>
        </div>
        <div className="bg-red-900 h-0 ml-96 mt-14 pl-96 mr-6">
          <Itemspecs></Itemspecs>
        </div>
      
        <div className='-mt-14  '>
          <Itemimage></Itemimage>
        </div>

      
        
          
       

        <div className=' mt-44 mb-9'>
          <ProductTabs></ProductTabs>
        </div>

        <div>
            <Itemrelates></Itemrelates>
        </div>


      
    </div>
      
    
    
  )
}
