import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../services/api";

export interface ProductsState {
  filters: unknown;
  products: ProductType[];
  sort: number;
  pageNumber: number;
  totalProducts: number;
}

const initialState: ProductsState = {
  sort: 1,
  pageNumber: 0,
  filters: [],
  products: [],
  totalProducts: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<unknown>) => {
      state.filters = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      //TODO: Might need messing with
      state.products.push(...action.payload);
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
    resetFilters: (state) => {
      state.pageNumber = 0;
    },
  },
});

export const { setFilters, setProducts, resetFilters, setTotalProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
