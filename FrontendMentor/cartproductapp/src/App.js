import "./App.css";
import ProductPage from "./components/Product/ProductPage";
import Cart from "./components/Product/Cart";

export default function App() {
  return (
    <div className="App">
      <ProductPage />
      <Cart />
    </div>
  );
}
