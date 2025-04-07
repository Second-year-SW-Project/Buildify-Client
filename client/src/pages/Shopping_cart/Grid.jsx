import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddToCartButton from './Itembuy';// Import the button

export default function Product_item_grid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-7 py-8">
      {products.map((product) => (
        <div key={product._id} className="border p-4 shadow-md">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>

          {/* Debugging: Console log to check if product data exists */}
          {console.log("Rendering product:", product)}

          {/* Add to Cart Button */}
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  );
}
