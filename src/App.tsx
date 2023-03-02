import css from "./App.module.css";
import { Filters } from "./components/filters";
import { ProductListings } from "./components/product-listings";

function App() {
  return (
    <div className={css.appContainer}>
      <Filters />
      <ProductListings />
    </div>
  );
}

export default App;
