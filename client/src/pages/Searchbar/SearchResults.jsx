import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ItemCard from "../../components/ItemCard"
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";
import Footer from "../../MoleculesComponents/User_navbar_and_footer/Footer";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);
  //fetch products for the query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await axios.get(`http://localhost:8000/api/product/search?query=${query}`);
        setProducts(response1.data);
        

      } catch (error) {
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>

        <Navbar></Navbar>
      <div className="container mx-auto p-4">
        <br></br>
        
        <h2 className="text-2xl font-semibold mb-4">
          Search results for: {query}
        </h2>
        <br></br>
        <br></br>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ItemCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
