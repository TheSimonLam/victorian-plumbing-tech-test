import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../services/api";

export interface ProductsState {
  filters: FilterType[];
  appliedFilters: string[];
  products: ProductType[];
  sort: number;
  pageNumber: number;
  totalProducts: number;
}

const initialState: ProductsState = {
  sort: 1,
  pageNumber: 1,
  filters: [],
  appliedFilters: [],
  products: [],
  totalProducts: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterType[]>) => {
      state.filters = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      //TODO: Might need messing with
      state.products.push(...action.payload);
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
    addFilter: (state, action: PayloadAction<string>) => {
      state.appliedFilters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.appliedFilters = state.appliedFilters.filter(
        (filter) => filter !== action.payload
      );
    },
    resetFilters: (state) => {
      state.pageNumber = 1;
      state.appliedFilters = [];
    },
  },
});

export const { setFilters, setProducts, resetFilters, setTotalProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
