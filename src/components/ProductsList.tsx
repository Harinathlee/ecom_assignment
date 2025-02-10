import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../types';
import ProductCard from '../layout/ProductCard';
import { RootState } from '../store/store';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsList = () => {
  const theme = useSelector((state: unknown) => state as RootState).theme;
  const { data, error, isLoading } = useGetProductsQuery({});

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme.theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme.theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        Error:
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap justify-center gap-6 p-6 ${
        theme.theme === 'light' ? 'bg-gray-200' : 'bg-gray-900'
      }`}
    >
      {data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
