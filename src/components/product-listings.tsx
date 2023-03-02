import { useState } from "react";
import css from "./product-listings.module.css";

interface IProductListingsProps {
  info?: any;
}

export const ProductListings = ({ info }: IProductListingsProps) => {
  const [haha, setHaha] = useState<any>([]);

  return <div className={css.productListings}>Hi</div>;
};
