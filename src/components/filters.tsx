import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter } from "./filter";
import css from "./filters.module.css";

export const Filters = () => {
  const filters = useSelector((state: RootState) => state.products.filters);

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
