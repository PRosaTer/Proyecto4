"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { loginUser } from "../server/Login.server"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }


    const result = await loginUser({ email, password });

    if (!result.success) {
      setError(result.error || "");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      });
      return;
    }

 
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));

    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Has iniciado sesión con éxito.",
    });

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white py-2 mt-6 rounded-md hover:bg-neutral-700 focus:ring focus:ring-neutral-500 focus:outline-none"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-neutral-400 text-sm mt-6">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="text-neutral-200 font-medium hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
