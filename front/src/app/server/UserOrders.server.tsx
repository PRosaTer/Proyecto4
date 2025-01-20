// components/server/UserOrders.server.tsx
import { User, Order } from "../../../interface/types";

export async function fetchUserOrders(token: string | null): Promise<{ user: User | null; orders: Order[] }> {
  if (!token) {
    throw new Error("No se encontró token de autenticación");
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    throw new Error("Error al leer los datos del usuario");
  }

  const response = await fetch("http://localhost:3002/users/orders", {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos del usuario y las órdenes");
  }

  const orders = await response.json();

  return { user, orders };
}
