/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Product } from "../../../interface/types";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para modificar tu carrito.");
      router.push("/login");
      return;
    }
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para proceder con la compra.");
      router.push("/login");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró un token de autenticación válido. Por favor, inicia sesión nuevamente.",
      });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id || cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo procesar la compra. Asegúrate de estar autenticado y de que el carrito no esté vacío.",
      });
      return;
    }

    const order = {
      userId: user.id,
      products: cartItems.map((item) => ({
        id: item.id,
      })),
    };

    const requestBody = JSON.stringify(order);

    fetch("http://localhost:3002/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: requestBody,
    })
      .then(async (response) => {
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Error al guardar la orden.");
        }
        return responseData;
      })

      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Compra realizada con éxito",
          text: `El total a abonar es $${totalAmount}`,
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Hubo un problema al procesar la compra.",
        });
      });
  };

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 sm:p-10 mt-20">
          <FaShoppingCart className="w-32 h-32 text-gray-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
          <p className="text-xl text-gray-400">Tu carrito está vacío.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 sm:p-10 mt-20">
        <FaShoppingCart className="w-32 h-32 text-gray-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>

        <div className="space-y-4 w-full max-w-full">
          {cartItems.map((item) =>
            item && item.id && item.name ? (
              <div
                key={item.id}
                className="border p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between w-full mb-4"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mb-4 sm:mb-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-lg mb-4 sm:mb-0">
                    Sin Imagen
                  </div>
                )}
                <div className="flex-1 ml-0 sm:ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-600 px-2 py-1 rounded text-white"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-600 px-2 py-1 rounded text-white"
                    >
                      +
                    </button>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white rounded-full px-4 py-2 mt-4 sm:mt-0"
                >
                  Eliminar
                </button>
              </div>
            ) : null
          )}
        </div>

        <div className="flex flex-col items-center mt-6 w-full max-w-3xl">
          <p className="text-xl">Total a abonar: ${totalAmount}</p>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200 mt-4 w-full sm:w-auto"
          >
            Realizar Compra
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Cart;