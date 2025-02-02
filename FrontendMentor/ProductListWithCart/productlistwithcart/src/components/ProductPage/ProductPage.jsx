import styles from "./ProductPage.module.css";
import ProductList from "./ProductList";

export default function ProductPage() {
  return (
    <>
      <div className={`${styles.productpage}`}>
        <ProductList />
      </div>
    </>
  );
}
