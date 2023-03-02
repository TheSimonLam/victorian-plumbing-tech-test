import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "./product";
import css from "./product-listings.module.css";

export const ProductListings = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className={css.productListings}>
      {products?.map((product, key) => (
        <Product key={key} product={product}></Product>
      ))}
    </div>
  );
};
