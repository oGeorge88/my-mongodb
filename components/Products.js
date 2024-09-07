import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Make sure this endpoint is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>; // Render loading state
  if (error) return <div>Error: {error}</div>; // Render error state

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} (Category: {product.category ? product.category.name : 'No Category'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
