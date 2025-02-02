import { useEffect, useState } from "react";
import { useContentful } from "../../useContentful.js";
import Product from "./Product";
import styles from "./ProductPage.module.css";
import Loader from "../Loader/Loader.jsx";
import Error from "../Error/Error.jsx";

export default function ProductList() {
  const [arr, setArr] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState([]);
  const [load, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [products, setProducts] = useState([]);
  const { getProducts, getFilteredProducts } = useContentful();

  function getItems() {
    getProducts(limit, skip)
      .then((products) => {
        setPages([]);
        setProducts(products[1]);
        setLoading(false);
        setTotal(products[0]);
        for (let i = 0; i < Math.floor((products[0] + limit - 1) / limit); i++)
          setPages((e) => [...e, i + 1]);
      })
      .catch((error) => {
        setErr(error);
        setLoading(false);
      });
  }

  function getItemsQuery(query) {
    getFilteredProducts(query, limit, skip)
      .then((products) => {
        setPages([]);
        setProducts(products[1]);
        setLoading(false);
        setTotal(products[0]);
        for (let i = 0; i < Math.floor((products[0] + limit - 1) / limit); i++)
          setPages((e) => [...e, i + 1]);
      })
      .catch((error) => {
        setErr(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setArr([]);
    getItems();
  }, [limit, skip]);

  useEffect(() => {
    setArr([]);
    getItems();
    if (filter.length > 0) {
      getItemsQuery(filter);
      products.forEach(([items, itemid]) => {
        setArr((array) => [
          ...array,
          {
            id: items.productImage?.sys?.id,
            unqid: itemid,
            title: items.productName,
            description:
              items?.productDescription.substring(0, 200) + "..." ?? "",
            partNo: items?.partNo,
            url: "https:" + items.productImage?.fields?.file?.url,
          },
        ]);
      });
    }
  }, [filter]);

  useEffect(() => {
    setArr([]);
    products.forEach(([items, itemid]) => {
      setArr((array) => [
        ...array,
        {
          id: items.productImage?.sys?.id,
          unqid: itemid,
          title: items.productName,
          description:
            items?.productDescription.substring(0, 200) + "..." ?? "",
          partNo: items?.partNo,
          url: "https:" + items.productImage?.fields?.file?.url,
        },
      ]);
    });
  }, [products]);

  return (
    <>
      {load && <Loader />}
      {err && <Error key={err} />}
      {!err && (
        <>
          <div className={`${styles.filterComponent}`}>
            <div className={`${styles.searchbar}`}>
              <fieldset>
                <legend> Search </legend>
                <form>
                  <input
                    placeholder="Search for the product and press Enter"
                    type="text"
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  />
                </form>
              </fieldset>
            </div>
            <div className={`${styles.quantity}`}>
              <fieldset>
                <legend>Qty</legend>
                <select
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                  }}
                >
                  <optgroup label="Products per page">
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </optgroup>
                </select>
              </fieldset>
            </div>
          </div>
          <div className={`${styles.pagination}`}>
            {pages.map((items) => (
              <li
                key={items}
                className={`${styles.page}`}
                onClick={() => setSkip((e) => (items - 1) * limit)}
              >
                {items}
              </li>
            ))}
          </div>
          <div className={`${styles.productList}`}>
            {arr?.map((e) => {
              return (
                <li className={`${styles.listStyleNone}`} key={e?.id}>
                  <Product
                    unqid={e?.unqid}
                    key={e?.id}
                    images={e?.url}
                    title={e?.title}
                    description={e?.description}
                    price={e?.partNo}
                  />
                </li>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
