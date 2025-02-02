import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./PhoneModal.module.css";

const PhoneNumberModal = ({
  onClose,
  phoneNumber,
  setPhoneNumber,
  userName,
  setUserName,
  submit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    // Check if phone number exists in local storage
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");
    if (!storedPhoneNumber) {
      setIsModalOpen(true); // Open modal if phone number is not present
    }
  }, []);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleInputChangeForName = (e) => {
    setUserName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/; // Validate for a 10-digit phone number
    sessionStorage.setItem("Name", userName);
    if (phonePattern.test(phoneNumber)) {
      sessionStorage.setItem("phoneNumber", phoneNumber); // Save phone number to local storage
      setError("");
      submit();
      setIsModalOpen(false); // Close the modal
    } else {
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.modal_overlay}`}>
      <div className={`${styles.modal_content}`}>
        <h2>Enter Your Phone Number</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name of the sender:</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={handleInputChangeForName}
            placeholder="Enter your name"
            required
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter 10-digit phone number"
            required
          />
          {error && <p className={`${styles.error_message}`}>{error}</p>}
          <div className={`${styles.modal_actions}`}>
            <button type="submit">Submit</button>
            <button type="reset" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default PhoneNumberModal;
