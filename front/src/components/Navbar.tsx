/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);

    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión con éxito.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4caf50",
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <nav className="bg-gray-800 text-gray-200 py-4 shadow-lg w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Imagen en el lado izquierdo */}
        <div className="flex items-center">
          <img
            src="/imagenes/imagen1.png"
            alt="Logo"
            className="h-10 w-10 mr-4"
          />
          <Link href="/" className="text-xl font-semibold text-white">
            iPhoneManía
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="/cart"
              className="text-lg hover:text-white transition duration-300"
            >
              carrito
            </a>
          </li>
          <li>
            <Link
              href="/product"
              className="text-lg hover:text-white transition duration-300"
            >
              productos
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`flex items-center space-x-6 ${
            isMobileMenuOpen ? "flex-col mt-4" : "hidden"
          } md:flex`}
        >
          {isAuthenticated ? (
            <>
              <a
                href="/dashboard"
                className="text-lg hover:text-white transition duration-300"
              >
                Mi cuenta
              </a>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cerrar Sesion
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-lg hover:text-white transition duration-300"
              >
                iniciar sesión
              </a>
              <a
                href="/register"
                className="text-lg hover:text-white transition duration-300"
              >
                registarse
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
