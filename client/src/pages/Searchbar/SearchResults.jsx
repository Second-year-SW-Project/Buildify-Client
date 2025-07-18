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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const [error, setError] = useState(null);
  //fetch products for the query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await axios.get(`${backendUrl}/api/product/all?query=${query}`);
        console.log(response1.data.data);
        if (response1.data.Success) {
          setProducts(response1.data.data);
        } else {
          setError(response1.data.message || "Error fetching search results");
        }
      } catch (error) {
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1c1e] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
          <p className="text-xl font-semibold">Loading search results...</p>
        </div>

      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div>

      <Navbar></Navbar>
      <div className="container mx-auto p-4">
        <br></br>

        <h2 className="text-2xl font-semibold mb-4">
          Search Results For : {query}
        </h2>
        <br></br>
        <br></br>

        <div className=" ml-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {products.map((product) => (
            <ItemCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
