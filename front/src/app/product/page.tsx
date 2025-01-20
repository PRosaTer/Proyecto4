/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Product } from "../../../interface/types"; 
import ProtectedRoute from "@/components/ProtectedRoute";
import Swal from "sweetalert2";
import Products from "../server/product.server";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await Products(); 
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: `${product.name} ha sido agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 pb-16 mt-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center p-4 bg-white dark:bg-neutral-900 shadow-md rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
            <p className="text-lg font-medium mb-2">Precio: ${product.price}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Stock disponible: {product.stock}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default ProductPage;
