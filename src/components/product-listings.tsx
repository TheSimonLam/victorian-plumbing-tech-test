import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, setProducts, setTotalProducts } from "../features/products/productsSlice";
import { getProducts } from "../services/api";
import { RootState } from "../store";
import { Product } from "./product";
import css from "./product-listings.module.css";

export const ProductListings = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const pageNumber = useSelector((state: RootState) => state.products.pageNumber);
  const appliedFilters = useSelector(
    (state: RootState) => state.products.appliedFilters
  );

  const paginate = async () => {
    const res = await getProducts({
      pageNumber: pageNumber + 1,
      appliedFilters,
    });

    dispatch(setProducts(res?.products));
    dispatch(setTotalProducts(res?.pagination?.total));
    dispatch(setPageNumber(pageNumber + 1));
  };

  const applySort = async () => {
    const res = await getProducts({
      pageNumber: 1,
      appliedFilters,
    });

    dispatch(setProducts(res?.products));
    dispatch(setTotalProducts(res?.pagination?.total));
    dispatch(setPageNumber(pageNumber + 1));
  };

  const handleScroll = (e: any) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if(totalProducts > products.length){
        paginate()
      }
    }
  };

  return (
    <div className={css.productListings} onScroll={handleScroll}>
      {products?.map((product, key) => (
        <Product key={key} product={product}></Product>
      ))}
    </div>
  );
};
