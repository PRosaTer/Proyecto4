import React from "react";
import { Product } from "../../../interface/types";

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://proyecto4-qrq4.onrender.com/products"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const TilteProduct = async () => {
  const TilteProducts = await fetchProducts();

  return (
    <div>
      {TilteProducts.map((product: Product) => {
        <div key={product.name}>el titulo del producto es {product.name}</div>;
      })}
      ,
    </div>
  );
};

export default TilteProduct;
