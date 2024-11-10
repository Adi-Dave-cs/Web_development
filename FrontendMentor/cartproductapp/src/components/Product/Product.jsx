import { useContext, useRef } from "react";
import styles from "./product.module.css";
import { MyCartContext } from "../../Model/Cart/mycartcontext";

export default function Product(props) {
  const buttonRef = useRef(null);
  const { addItems } = useContext(MyCartContext);

  function addToCart() {
    addItems({
      name: props.name,
      id: props.id,
      price: props.price,
      image: props.thumbnail,
    });
  }
  return (
    <>
      <div className={`${styles.productCard}`}>
        <img
          className={`${styles.thumbnail}`}
          src={`${props.thumbnail}`}
          alt=""
        />
        <div className={`${styles.productName}`}>{props.name}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "60%", height: "10px", border: `2px solid black` }}
          >
            <div
              style={{
                width: `${props.rating * 20}%`,
                height: "90%",
                backgroundColor: "yellow",
              }}
            ></div>
          </div>
          <div>{props.rating}/ 5</div>
        </div>
        <div className={`${styles.status}`}>{props.status}</div>
        <div className={`${styles.productPrice}`}>${props.price}</div>
        <button
          className={`${styles.cartEdit}`}
          ref={buttonRef}
          onClick={() => {
            addToCart();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
