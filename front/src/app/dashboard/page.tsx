"use client";
import { useState, useEffect } from "react";
import { FaUser, FaTachometerAlt } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Order } from "../../../interface/types";
import { fetchUserOrders } from "../server/UserOrders.server";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const { user, orders } = await fetchUserOrders(token);
        setUser(user);
        setOrders(orders);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 mt-16">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 mt-16">
        Cargando...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-10 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 mt-16">
        <FaTachometerAlt className="w-20 h-20 text-blue-500 mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Perfil del Usuario</h1>
        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          Bienvenido al panel de control.
        </p>

        <div className="w-full sm:w-3/4 md:w-1/2 p-6 rounded-lg shadow-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-3 text-blue-500" /> Información de Usuario
          </h2>
          <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-400">Nombre: {user.name}</p>
          <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-400">Email: {user.email}</p>
        </div>

        <div className="w-full sm:w-3/4 md:w-1/2 p-6 mt-8 rounded-lg shadow-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-500">Mis Órdenes</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
                  <p className="text-lg text-neutral-800 dark:text-neutral-200">Estado: {order.status}</p>
                  <p className="text-lg text-neutral-800 dark:text-neutral-200">Fecha: {order.date}</p>
                  <ul className="mt-2 space-y-2">
                    {order.products.map((product) => (
                      <li key={product.id} className="text-sm text-neutral-600 dark:text-neutral-400">
                        Producto: {product.name} - ${product.price}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">No tienes órdenes aún.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
