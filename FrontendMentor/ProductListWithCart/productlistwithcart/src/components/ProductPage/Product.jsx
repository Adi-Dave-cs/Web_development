import PhoneNumberModal from "./PhoneNumberModal";
import { NavLink } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";

export default function Product(props) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    sessionStorage.getItem("phoneNumber") ?? "NoPhoneNumber"
  );
  const [userName, setUserName] = useState(
    sessionStorage.getItem("userName") ?? "NoUserName"
  );
  const [formData, setFormData] = useState({
    senderName: "John Doe", // Replace with state values
    senderEmail: "john@example.com",
    subject: "Inquiry email",
    message: "This is a test message",
  });

  function toggleFormModal() {
    setOpenModal((a) => !a);
  }

  useEffect(() => {
    setFormData((f) => ({
      ...f,
      senderName: userName,
      message: `This is an inquiry for ${props.title} by ${userName} with phone number:${phoneNumber}`,
    }));
  }, [userName, phoneNumber]);

  useEffect(() => {
    if (status !== "") alert(status);
  }, [status]);

  const sendMessage = async () => {
    // check if the phone number exists in the local storage.
    const phoneNumber = sessionStorage.getItem("phoneNumber");

    if (phoneNumber == "NoPhoneNumber" || userName == "NoUserName") {
      toggleFormModal();
    } else {
      try {
        const response = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        setStatus(
          response.ok ? "✅ Email sent successfully!" : `❌ ${data.error}`
        );
      } catch (error) {
        setStatus("❌ Failed to send email.");
      }
    }
  };

  return (
    <>
      {openModal && (
        <PhoneNumberModal
          onClose={toggleFormModal}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          userName={userName}
          setUserName={setUserName}
          submit={sendMessage}
        />
      )}
      <div className={`${styles.productcard}`}>
        <img
          className={`${styles.productimage}`}
          src={props?.images}
          alt="This is an alt text"
        />
        <div className={`${styles.productinfo}`}>
          <div className={`${styles.producttitle}`}>{props.title}</div>
          <div className={`${styles.productdescription}`}>
            {props?.description}
          </div>
          <div className={`${styles.productfooter}`}>
            {props.partNo && (
              <div className={`${styles.productprice}`}>
                PartNo : ${props?.partNo}
              </div>
            )}
            <button
              className={`${styles.inquirybutton}`}
              onClick={() => {
                setFormData((f) => ({
                  ...f,
                  message: `This is an inquiry for the ${props.title} by ${userName} with phone number:${phoneNumber}`,
                }));
                sendMessage();
              }}
            >
              Inquiry
            </button>
            <NavLink to={`/app/${props?.unqid}`}>
              <button className={`${styles.more}`}>More</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
