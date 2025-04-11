import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Itempath from './components/Itempath';

import Itemimage from './components/Itemimage';
import ProductTabs from './components/Itemdiscription';
import Itemrelates from './components/Itemrelates';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import Itemspecs from './components/Itemspecs';






export default function Itempage() {



  const { id } = useParams();            {/* get paticular data from id */}
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.text();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <Navbar />

      <Itempath/>
      <div>
        <h1>{product.name}</h1>
      </div>

      <div>
        <Itemimage/> {/*individual item images are Here..basically 2 images */}
      </div>



          {/* className="mt-[-560px] ml-[550px]" */}
      <div className="mt-[-560px] ml-[550px]">
        <Itemspecs />
      </div>

      <div className="mt-44 mb-9">
        <ProductTabs />
      </div>

      <div>
        <Itemrelates category={product.type} />
      </div>

      <Footer />
    </div>
  );
}