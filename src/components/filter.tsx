import { FilterType } from "../services/api";
import css from "./filter.module.css";

interface IFilterProps {
  filter: FilterType;
}

export const Filter = ({ filter }: IFilterProps) => {
  return (
    <div className={css.filterContainer}>
      <p className={css.filterTitle}>{filter?.displayName}</p>
      {filter?.options?.map((option) => (
        <div className={css.filterOptionContainer}>
          <label>
            {typeof option?.value === "string"
              ? option?.value
              : typeof option?.value === "boolean"
              ? "Available now"
              : `£${option?.value?.gte} - £${option?.value?.lte || "^"}`}
          </label>
          <input type="checkbox" />
        </div>
      ))}
    </div>
  );
};
