"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../interface/types";
import { fetchUserOrders } from "../server/UserOrders.server";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const { user } = await fetchUserOrders(token);
        setUser(user);
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
    return <div className="text-red-500 mt-16">{error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500 mt-16">Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Perfil del Usuario</h1>
      <p className="text-lg">Nombre: {user.name}</p>
      <p className="text-lg">Email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
