import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setPageNumber,
  setProducts,
  setTotalProducts,
} from "../features/products/productsSlice";
import { getProducts } from "../services/api";
import { RootState } from "../store";
import { Filter } from "./filter";
import css from "./filters.module.css";

export const Filters = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(
    (state: RootState) => state.products.appliedFilters
  );
  const filters = useSelector((state: RootState) => state.products.filters);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await getProducts({
        pageNumber: 1,
        appliedFilters,
      });

      dispatch(setPageNumber(1));
      dispatch(setProducts(res?.products));
      dispatch(setTotalProducts(res?.pagination?.total));

      if (filters.length === 0) {
        // Initilize filters
        dispatch(setFilters(res?.facets));
      }
    };
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  return (
    <div className={css.filtersContainer}>
      {filters?.map((filter, key) => {
        if (
          filter?.options?.length === 0 ||
          filter?.displayName === "Toilets"
        ) {
          // Filtering out empty options (and "Toilets" category because I'm not sure how to handle this)
          return null;
        } else {
          return <Filter key={key} filter={filter}></Filter>;
        }
      })}
    </div>
  );
};
