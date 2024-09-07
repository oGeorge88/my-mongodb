import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Make sure this endpoint is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>; // Render loading state
  if (error) return <div>Error: {error}</div>; // Render error state

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name} - {category.description || 'No Description'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
