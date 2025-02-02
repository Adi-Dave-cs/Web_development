import ReactDOM from "react-dom";
import styles from "./InformationModal.module.css";

export default function InformationModal({ toggle, information }) {
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal_overlay}`}>
        <div className={`${styles.modal_content}`}>
          <h2>Information</h2>
          <label htmlFor="name">Name : John Doe</label>
          {information === "PhoneNumber" && (
            <label htmlFor="phone">Phone Number: +91-9999888822</label>
          )}
          {information === "Email" && (
            <label htmlFor="phone">Email: stuvwxyz@gmail.com </label>
          )}
          <div className={`${styles.modal_actions}`}>
            <button type="reset" onClick={toggle}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
