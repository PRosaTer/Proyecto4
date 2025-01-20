"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../server/Register.server";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const result = await registerUser({ name, email, password, address, phone });

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "¡Tu cuenta ha sido registrada!",
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100 ">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">
          Crear Cuenta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ejemplo: Juan Pérez"
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ejemplo: juan.perez@email.com"
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ejemplo: 1234567890"
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ejemplo: Av. Siempre Viva 123"
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
                placeholder="Contraseña"
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
                className="w-full border border-neutral-700 rounded-md px-3 py-2 text-white bg-gray-800 focus:ring focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white py-2 mt-6 rounded-md hover:bg-neutral-700 focus:ring focus:ring-neutral-500 focus:outline-none"
          >
            Registrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-neutral-400 font-semibold hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
