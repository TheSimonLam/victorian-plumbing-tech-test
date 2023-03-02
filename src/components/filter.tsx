import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppliedFilterOptions,
  processFiltering,
  setProducts,
  setTotalProducts,
} from "../features/products/productsSlice";
import { FilterType, getProducts } from "../services/api";
import { RootState } from "../store";
import css from "./filter.module.css";

interface IFilterProps {
  filter: FilterType;
}

export const Filter = ({ filter }: IFilterProps) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(
    (state: RootState) => state.products.appliedFilters
  );

  useEffect(() => {
    const loadProducts = async () => {
      const res = await getProducts({
        pageNumber: 1,
        appliedFilters,
      });
      dispatch(setProducts(res?.products));
      dispatch(setTotalProducts(res?.pagination?.total));
    };
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  const handleFilterClicked = (
    filter: FilterType,
    option: AppliedFilterOptions
  ) => {
    dispatch(processFiltering({ filter, option }));
  };
  return (
    <div className={css.filterContainer}>
      <p className={css.filterTitle}>{filter?.displayName}</p>
      {filter?.options?.map((option, key) => (
        <div key={key} className={css.filterOptionContainer}>
          <label>
            {typeof option?.value === "string"
              ? option?.value
              : typeof option?.value === "boolean"
              ? "Available now"
              : `£${option?.value?.gte} - £${option?.value?.lte || "^"}`}
          </label>
          <input
            type="checkbox"
            onClick={() => handleFilterClicked(filter, option)}
          />
        </div>
      ))}
    </div>
  );
};
