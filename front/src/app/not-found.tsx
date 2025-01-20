/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Oops! Página no encontrada.</p>
      
      <p className="mt-2">
        La página que estás buscando no existe. Por favor, verifica la URL o regresa al inicio.
      </p>
      
      <img
        src="https://i.pinimg.com/originals/72/38/4f/72384fba9b84473336e8bbbbdbdeffe8.png"
        alt="Imagen de error 404"
        className="mt-6 w-72 h-auto rounded-lg shadow-md"
      />
      
      <Link href="/" className="mt-6 text-blue-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
