import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProducts,
  setFilters,
  setPageNumber,
  setProducts,
  setSort,
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
  const [selectedSort, setSelectedSort] = useState(1);

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

  useEffect(() => {
    const applySort = async () => {
      const res = await getProducts({
        pageNumber: 1,
        appliedFilters,
        sort: selectedSort,
      });

      dispatch(setSort(selectedSort));
      dispatch(resetProducts());
      dispatch(setProducts(res?.products));
      dispatch(setTotalProducts(res?.pagination?.total));
      dispatch(setPageNumber(1));
    };
    applySort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  const handleSortSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(parseInt(e.target.value));
  };

  const sortOptions = [
    {
      label: "Recommended",
      value: 1,
    },
    {
      label: "Price low to high",
      value: 2,
    },
    {
      label: "Price high to low",
      value: 3,
    },
    {
      label: "Largest discount",
      value: 4,
    },
  ];
  return (
    <div className={css.filtersContainer}>
      <select value={selectedSort} onChange={handleSortSelected}>
        {sortOptions.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
