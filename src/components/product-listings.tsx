import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "./product";
import css from "./product-listings.module.css";

export const ProductListings = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const handleScroll = (e: any) => {
    const target = e.target;
    if(target.scrollHeight - target.scrollTop === target.clientHeight){
      console.log('whoe')
    }
  }

  return (
    <div className={css.productListings} onScroll={handleScroll}>
      {products?.map((product, key) => (
        <Product key={key} product={product}></Product>
      ))}
    </div>
  );
};
