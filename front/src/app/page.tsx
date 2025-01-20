/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-7xl font-extrabold text-neutral-100 mb-10 leading-tight">
          Bienvenido a iPhoneManía
        </h1>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src="imagenes/imagen1.png"
              alt="Bienvenida a MobileEase"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4 border-4 border-neutral-100"
            />
          </div>
          <p className="text-xl text-neutral-200">
            Simplifica tu vida con una experiencia móvil diseñada pensando en ti.
          </p>
          <p className="text-xl text-neutral-200">
            Accede a herramientas inteligentes que se adaptan a tus necesidades diarias, desde comunicación hasta productividad.
          </p>
          <p className="text-xl text-neutral-200">
            Explora una interfaz intuitiva que te permite disfrutar de tus aplicaciones favoritas sin complicaciones.
          </p>
          <p className="text-xl text-neutral-200">
            Mantente conectado con las personas y la información que importan, donde sea que te encuentres.
          </p>
          <p className="text-xl text-neutral-200">
            Descubre actualizaciones constantes que aseguran una experiencia moderna y confiable.
          </p>
          <p className="text-xl text-neutral-200 mb-8">
            Bienvenido a MobileEase, la app que lleva tu mundo al alcance de tu mano.
          </p>

          {/* Botón de redirección */}
          <div className="flex justify-center">
            <Link href="./product">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                Descubre Más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
