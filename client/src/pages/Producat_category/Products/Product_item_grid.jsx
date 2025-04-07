import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import { useParams } from 'react-router';
import axios from "axios"
import Itemcard from '../../../components/ItemCard';




export default function Product_item_grid() {



    const { categoryName } = useParams(); // Get the category name from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch products by category
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/product/filter?attribute=type&value=${categoryName}`
          );
          console.log("product==================", response)
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [categoryName]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

  return (

        

        <div >

          
            
            



              
            {/* if you want test remove ml and mt of below div.. */}

            <div className="ml-[230px] mt-[-1080px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10  px-7 py-8">
                {products.map(product => (
                    <Itemcard key={product._id}  product={product} />
                ))}
            </div>
            
          
          
          
      



        </div>
    
    
  )
}



