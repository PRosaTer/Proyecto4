/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "../../../../interface/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:3002/products");
          const data: Product[] = await response.json();
          const selectedProduct = data.find((item) => item.id === Number(id));
          setProduct(selectedProduct || null);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setLoading(false); 
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg shadow-xl mt-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full sm:w-1/2 h-96 object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col justify-between w-full sm:w-1/2">
            <h1 className="text-3xl font-bold text-center sm:text-left mb-4">{product.name}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-blue-600 mb-4">Precio: ${product.price}</p>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
                if (existingProductIndex >= 0) {
                  cart[existingProductIndex].quantity += 1;
                } else {
                  cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem("cart", JSON.stringify(cart));

                Swal.fire({
                  icon: 'success',
                  title: `${product.name} ha sido agregado al carrito`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
            >
             agregar al carrito
            </button>

            <button
              onClick={() => router.push('/product')}
              className="w-full sm:w-auto mt-4 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
            >
              ir a productos
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductDetail;
