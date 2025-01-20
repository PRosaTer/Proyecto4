import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    price: 699,
    description:
      "Experimenta potencia y elegancia con el iPhone 11: captura momentos increíbles con su sistema de doble cámara, disfruta de un rendimiento excepcional y sumérgete en una brillante pantalla Liquid Retina. ¡Descubre un mundo de posibilidades en la palma de tu mano!",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWI8yU3upOy-5GsYqGz0QTcSjwkWfK04bcsSphye-m1mhvawNclXhwQPFhEqS3DWc_sWRKAC6nD6meheIaAdiBk2gugVVj2vGeJ_6tzXqbDEWv1e3NX5KU9A&usqp=CAE",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Descubre la eficiencia y la sofisticación del MacBook Air: un diseño ligero que combina con un potente rendimiento, una impresionante pantalla Retina que da vida a tu trabajo y una batería de larga duración que te mantiene productivo dondequiera que estés. Eleva tu experiencia informática con el MacBook Air.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhDzLeZGzcke0oQZgTPUulWYsy7S2PZ6xKOA&s",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Desata tu creatividad y productividad con el iPad Pro: un rendimiento poderoso, una impresionante pantalla Liquid Retina y una batería de larga duración lo convierten en la herramienta perfecta para trabajar y divertirte. Transforma tus ideas en realidad con el iPad Pro.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-kPDOizTGHmJDTqlCxOguZmOUV0k-kltXg&s",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch Series 6",
    price: 399,
    description:
      "Mantente conectado y saludable con el Apple Watch Series 6: sigue tus entrenamientos, monitorea tu salud y mantente al tanto de las personas e información que más te importan. Vive el futuro de la salud y el bienestar con el Apple Watch Series 6.",
    image:
      "https://i.blogs.es/975666/apple-watch-series-6-01-frontal-01/450_1000.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods Pro",
    price: 249,
    description:
      "Sumérgete en el sonido con los AirPods Pro: cancelación activa de ruido, modo transparencia y ajuste personalizable los convierten en el compañero perfecto para música, llamadas y todo lo demás. Eleva tu experiencia de audio con los AirPods Pro.",
    image:
      "https://www.teknofilo.com/wp-content/uploads/2023/11/Analisis-AirPods-Pro-USB-C-Teknofilo-1-1200x797.jpg",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "Eleva la experiencia de audio en tu hogar con el HomePod mini: sonido envolvente, asistente inteligente y centro de control para tu hogar inteligente lo convierten en el complemento perfecto para tu casa. Disfruta de un mundo de música, noticias y mucho más con el HomePod mini",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hxw2OuDmb3vjdKdR6UqixWsKTwXQ8_38Mw&s",
    categoryId: 6,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
