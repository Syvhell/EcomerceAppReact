import ProductCard from "./ProductCard";
import ProductSearch from "./SearchProduct";

import { useState, useEffect } from "react";

export default function UserView({ productsData, cartHandleClickAdd }) {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      if (product.isActive === true) {
        return (
          <ProductCard
            productProp={product}
            key={product._id}
            cartHandleClickAdd={cartHandleClickAdd}
          />
        );
      } else {
        return null;
      }
    });

    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <ProductSearch />
      <h1 className="py-3">Mophie Products</h1>
      <hr className="pb-2" />
      {product}
    </>
  );
}
