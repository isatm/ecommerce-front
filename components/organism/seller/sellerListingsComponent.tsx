'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/buttonComponent';
import InputComponent from '@/components/atoms/inputComponent';
import { useForm } from 'react-hook-form';
import { Search, Loader2 } from 'lucide-react'; 
import { useAuth } from '@/contexts/authContext'; 
import { getProductsBySellerId } from '@/libs/services/productService';
import { Product } from '@/interfaces/shoppingInterfaces/productInterface'; 

interface ListingSearchForm {
  keyword: string;
}

export default function SellerListingsComponent() {
  const { register, handleSubmit } = useForm<ListingSearchForm>();
  const { user, loading: authLoading } = useAuth(); // Obtener usuario y estado de carga del AuthContext
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorLoadingProducts, setErrorLoadingProducts] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (authLoading || !user) {
        if (!authLoading && !user) {
          setErrorLoadingProducts("Debes iniciar sesión como vendedor para ver tus publicaciones.");
          setLoadingProducts(false);
        }
        return;
      }

      setLoadingProducts(true);
      setErrorLoadingProducts(null);
      try {
        if (user.role !== 'seller') {
          setErrorLoadingProducts("Tu rol no te permite ver publicaciones de vendedor.");
          setLoadingProducts(false);
          return;
        }
        const fetchedProducts = await getProductsBySellerId(user.id);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error al cargar los productos del vendedor:", err);
        setErrorLoadingProducts("Error al cargar tus productos. Inténtalo de nuevo.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchSellerProducts();
  }, [user, authLoading]); // Se ejecuta cuando el usuario o el estado de carga de autenticación cambian

  const onSubmitSearch = (data: ListingSearchForm) => {
    console.log("Searching listings:", data.keyword);
    // Aquí podrías implementar la lógica de filtrado de los productos ya cargados
    // o hacer una nueva llamada al servicio con el término de búsqueda.
    // Por ahora, solo simula la búsqueda.
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Listings</h2>
        <Button variant="primary" className="px-4 py-2" onClick={() => console.log("Navigate to create product")}>
          Create New Listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <form onSubmit={handleSubmit(onSubmitSearch)} className="flex items-center">
            {/*
            <InputComponent
              idElement="keywordSearch"
              name="keyword"
              register={register}
              placeholder="Search your listings"
              iconLeft={<Search size={18} />}
              className="pr-10"
            /> */}
          </form>
        </div>

        <div className="flex justify-end items-center space-x-4">
          <label htmlFor="sortOrder" className="text-gray-600 text-sm">Sort by:</label>
          <select
            id="sortOrder"
            className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-400"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="priceLow">Price: Low to High</option>
          </select>
        </div>
      </div>

      {loadingProducts ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-orange-500 mr-2" size={24} />
          <p className="text-gray-600">Loading your products...</p>
        </div>
      ) : errorLoadingProducts ? (
        <div className="text-center py-10 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
          <p className="text-red-600 text-lg mb-4">{errorLoadingProducts}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-md p-4 flex items-center space-x-4">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover rounded" />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                <p className="text-indigo-600 font-bold mt-1">${product.price.toFixed(2)}</p>
                <p className="text-gray-500 text-xs">Stock: {product.stock} | Category: {product.category}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" className="px-3 py-1 text-sm">Edit</Button>
                <Button variant="secondary" className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">You don't have any listings yet.</p>
          <Button variant="primary" onClick={() => console.log('Create a new listing clicked')}>
            Create a new listing
          </Button>
        </div>
      )}
    </div>
  );
}