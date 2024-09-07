import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Products from '../components/Products';
import Categories from '../components/Categories';
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Product form hook
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // Category form hook
  const { register: registerCategory, handleSubmit: handleSubmitCategory, reset: resetCategory, formState: { errors: categoryErrors } } = useForm();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add new product
  const onSubmitProduct = async (data) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        fetchProducts();
        reset(); // Clear the form fields
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Add new category
  const onSubmitCategory = async (data) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        fetchCategories();
        resetCategory(); // Clear the form fields
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-3xl font-bold text-gray-700 mb-4">
            Explore Our Products and Categories
          </p>
          <div className="flex items-center gap-4">
            <a
              className="text-gray-600"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        {/* Products and Categories Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <Products products={products} deleteProduct={deleteProduct} />
          <Categories categories={categories} deleteCategory={deleteCategory} />
        </div>

        {/* Forms Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Add New Product Form */}
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit(onSubmitProduct)} className="space-y-4">
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Code:</label>
                <input
                  type="text"
                  placeholder="Code"
                  {...register('code', { required: "Product code is required" })}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: "Product name is required" })}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Description:</label>
                <textarea
                  placeholder="Description"
                  {...register('description')}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Price:</label>
                <input
                  type="number"
                  placeholder="Price"
                  {...register('price', { required: "Price is required" })}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Category:</label>
                <select
                  {...register('category')}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md w-full">Add Product</button>
            </form>
          </div>

          {/* Add New Category Form */}
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
            <form onSubmit={handleSubmitCategory(onSubmitCategory)} className="space-y-4">
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Category Name:</label>
                <input
                  type="text"
                  placeholder="Category Name"
                  {...registerCategory('name', { required: "Category name is required" })}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {categoryErrors.name && <p className="text-red-500 text-sm">{categoryErrors.name.message}</p>}
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Description:</label>
                <textarea
                  placeholder="Description"
                  {...registerCategory('description')}
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full">Add Category</button>
            </form>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <Link href="#products" className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4">
            View Products
          </Link>
          <Link href="#categories" className="rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4">
            View Categories
          </Link>
        </div>
      </div>
    </main>
  );
}
