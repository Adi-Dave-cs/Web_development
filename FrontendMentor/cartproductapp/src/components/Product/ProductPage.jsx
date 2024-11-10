import styles from "./product.module.css";
import Product from "./Product";
import { useEffect, useState } from "react";

async function loader(setData, setPages, skip) {
  await fetch(`https://dummyjson.com/products?limit=30&skip=${(skip - 1) * 30}`)
    .then((res) => res.json())
    .then((res) => {
      setData(res.products);
      setPages((p) => Math.ceil(res.total / 30));
    });
  return;
}
export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [skip, setSkip] = useState(1);
  let numPages = [];

  useEffect(() => {
    loader(setProducts, setPages, skip);
  }, [skip]);

  for (let i = 0; i < pages; i++) {
    numPages.push(i + 1);
  }

  return (
    <>
      <div className={`${styles.productBody}`}>
        <div className={`${styles.productTitle}`}>
          <p>ProductZilla</p>
        </div>
        <div className={`${styles.productList}`}>
          {products &&
            products?.map((e) => {
              return (
                <Product
                  key={e.id}
                  id={e.id}
                  name={e.title}
                  thumbnail={e.thumbnail}
                  price={e.price}
                  rating={e.rating}
                  status={e.availabilityStatus}
                  category={e.category}
                  discount={e.discountPercentage}
                  stock={e.stock}
                />
              );
            })}
        </div>
        <div className={`${styles.Pagination}`}>
          {numPages?.map((e) => {
            return (
              <button
                key={e}
                className={`${styles.pages}`}
                onClick={() => setSkip((g) => e)}
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
