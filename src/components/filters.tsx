import { useState } from "react";
import css from "./filters.module.css";

interface IFiltersProps {
  info?: any;
}

export const Filters = ({ info }: IFiltersProps) => {
  const [haha, setHaha] = useState<any>([]);

  return <div className={css.filtersContainer}>Hi</div>;
};
