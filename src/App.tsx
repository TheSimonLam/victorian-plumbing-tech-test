import { useEffect } from "react";
import { useDispatch } from "react-redux";
import css from "./App.module.css";
import { Filters } from "./components/filters";
import { ProductListings } from "./components/product-listings";
import { setFilters, setProducts, setTotalProducts } from "./features/products/productsSlice";
import { getProducts } from "./services/api";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialLoad = async () => {
      const res = await getProducts({ pageNumber: 1 });
      dispatch(setFilters(res?.facets));
      dispatch(setProducts(res?.products));
      dispatch(setTotalProducts(res?.pagination?.total));
      console.log(res);
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.appContainer}>
      <Filters />
      <ProductListings />
    </div>
  );
}

export default App;
