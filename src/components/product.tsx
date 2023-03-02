import { ProductType } from "../services/api";
import css from "./product.module.css";

interface IProductProps {
  product: ProductType;
}

export const Product = ({ product }: IProductProps) => {
  return (
    <div className={css.productContainer}>
      <img src={product?.image?.url} alt={product?.image?.externalId} />
      <p>{product?.productName}</p>
      <p className={css.productPrice}>{product?.price?.priceIncTax}</p>
    </div>
  );
};
