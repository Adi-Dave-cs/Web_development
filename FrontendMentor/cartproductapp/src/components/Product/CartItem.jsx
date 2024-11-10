import { useContext } from "react";
import styles from "./product.module.css";
import { MyCartContext } from "../../Model/Cart/mycartcontext";

export default function CartItem(props) {
  const { removeItems } = useContext(MyCartContext);
  return (
    <>
      <div className={`${styles.cartItem}`}>
        <img src={props?.thumbnail} width="60%" height="90%" alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontSize: "1.5vh",
              fontWeight: "bolder",
              marginLeft: "5px",
            }}
          >
            {props.name}
          </p>
          <p
            style={{
              fontSize: "1vh",
              fontWeight: "bold",
              fontStyle: "italic",
              marginRight: "5px",
            }}
          >
            {props.price * props.quantity}
          </p>
        </div>
        <button
          onClick={() => {
            removeItems({
              name: props.name,
              id: props.id,
              price: props.price,
              image: props.thumbnail,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="red"
          >
            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
