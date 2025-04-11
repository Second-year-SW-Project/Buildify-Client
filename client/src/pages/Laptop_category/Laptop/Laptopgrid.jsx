import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios"
import Itemcard from '../../../components/ItemCard';
import Navbar from '../../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../../MoleculesComponents/User_navbar_and_footer/Footer';




export default function Laptopgrid() {



    const [laps, setLaps] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch products by category
      const fetchLaps = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/laptops/`
          );
          setLaps(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      };
  
      fetchLaps();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

  return (

        

        <div >

          
            
            



              {/* if you want test remove ml and mt of below div.. */}
            

            <div className="ml-[230px] mt-[-1080px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10  px-7 py-8">
                {laps.map(lap => (
                    <Itemcard key={lap._id}  product={lap} />
                ))}
            </div>
            
          
          
          
      


        </div>
    
    
  )
}



