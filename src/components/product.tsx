import { ProductType } from "../services/api";
import css from "./product.module.css";

interface IProductListingProps {
  product: ProductType;
}

export const Product = ({ product }: IProductListingProps) => {
  return (
    <div className={css.productContainer}>
      <img src={product?.image?.url} alt={product?.image?.externalId} />
      <p>{product?.productName}</p>
      <p className={css.productPrice}>{product?.price?.priceIncTax}</p>
    </div>
  );
};
