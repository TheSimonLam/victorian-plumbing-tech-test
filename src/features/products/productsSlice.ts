import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterType, ProductType } from "../../services/api";

export type AppliedFilterOptions = {
  identifier: string;
  value: { lte: number; gte: number } | string;
};

export type AppliedFilter = { [key: string]: AppliedFilterOptions[] };

export interface ProductsState {
  filters: FilterType[];
  appliedFilters: AppliedFilter;
  products: ProductType[];
  sort: number;
  pageNumber: number;
  totalProducts: number;
}

const initialState: ProductsState = {
  sort: 1,
  pageNumber: 1,
  filters: [],
  appliedFilters: {},
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
    processFiltering: (
      state,
      action: PayloadAction<{
        filter: FilterType;
        option: AppliedFilterOptions;
      }>
    ) => {
      const identifier = action?.payload?.filter?.identifier;
      const selectedOption = action?.payload?.option;
      const selectionOptionIdentifier = selectedOption?.identifier;
      let filterAlreadyExists = false;

      if (Object.keys(state.appliedFilters).length === 0) {
        // First time applying a filter
        state.appliedFilters = {
          ...state.appliedFilters,
          [identifier]: [selectedOption],
        };
      } else {
        for (const [key, value] of Object.entries(state.appliedFilters)) {
          // When there's already filters in the same category applied
          if (key === identifier) {
            for (const alreadyAppliedFilter of value) {
              if (
                alreadyAppliedFilter.identifier === selectionOptionIdentifier
              ) {
                filterAlreadyExists = true;
              }
            }

            if (!filterAlreadyExists) {
              state.appliedFilters[identifier].push(selectedOption);
            } else {
              //remove the filter
              const filtersWithRemovedFilter = value.filter(function (el) {
                return el.identifier !== selectionOptionIdentifier;
              });
              state.appliedFilters = {
                ...state.appliedFilters,
                [identifier]: filtersWithRemovedFilter,
              };
            }
          } else {
            state.appliedFilters = {
              ...state.appliedFilters,
              [identifier]: [selectedOption],
            };
          }
        }
      }
    },
    resetFilters: (state) => {
      state.pageNumber = 1;
      state.appliedFilters = {};
    },
  },
});

export const {
  setFilters,
  setProducts,
  resetFilters,
  setTotalProducts,
  processFiltering,
} = productsSlice.actions;

export default productsSlice.reducer;
