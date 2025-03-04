import React from 'react'
import Itempath from './components/Itempath'
import Itemspecs from './components/Itemspecs'
import Itemimage from './components/Itemimage'
import ProductTabs from './components/Itemdiscription'
import Itemrelates from './components/Itemrelates'
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'






export default function Itempage() {
  return (
    <div>
        <div>
          <Navbar></Navbar>
        </div>

        <div>
          <Itempath 
            paths={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Processors", href: "/components/processors" },
              { label: "Intel Core Ultra 9 Processor 285K" }
            ]}    />
        </div>


        
      
        <div className=''>
          
          
          <Itemimage images={[
            "./proc.png",
            "./sub1.png"

          ]}/>



        </div>

        <div className="mt-[-560px] ml-[550px]">
          <Itemspecs></Itemspecs>

        </div>

      
        
          
       

        <div className=' mt-44 mb-9'>
          <ProductTabs></ProductTabs>
        </div>

        <div>
            <Itemrelates></Itemrelates>
        </div>

        <Footer></Footer>


      
    </div>
      
    
    
  )
}
