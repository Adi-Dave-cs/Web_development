import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { motion, spring } from "motion/react";
import InformationModal from "../ContactPage/InformationModal";

function ErrorMessage({ text }) {
  return (
    <>
      <p className={`${styles.errorMessage}`}>! {text}</p>
    </>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(true);
  const [country, setCountry] = useState("IN");
  const [inquiry, setInquiry] = useState("");
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("");
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    senderName: "John Doe",
    senderEmail: "john@example.com",
    subject: "Inquiry email",
    message: "This is a test message",
  });

  function toggleModal() {
    setOpen((open) => !open);
    return;
  }
  useEffect(() => {
    if (status !== "") alert(status);
  }, [status]);

  const sendMessage = async () => {
    try {
      console.log(formData);
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
      console.log(error);
      setStatus("❌ Failed to send email.");
    }
  };

  useEffect(() => {
    setFormData((f) => ({
      ...f,
      senderName: name,
      message: `This is an inquiry from ${phone} having Name : ${name} . Message : ${inquiry}`,
    }));
  }, [phone, name, inquiry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  function validatePhoneNumber(phone) {
    const phonePatterns = {
      IN: /^\+?91[6-9]\d{9}$/, // India: Starts with +91 or 91 and 10 digits (6-9)
      AF: /^\+?93\d{9}$/, // Afghanistan: +93 and 9 digits
      BD: /^\+?8801[3-9]\d{8}$/, // Bangladesh: +880 followed by 1 and 9 digits
      BT: /^\+?975\d{8}$/, // Bhutan: +975 and 8 digits
      CN: /^\+?86\d{11}$/, // China: +86 and 11 digits
      MM: /^\+?95\d{7,10}$/, // Myanmar: +95 and 7 to 10 digits
      NP: /^\+?977\d{8}$/, // Nepal: +977 and 8 digits
      PK: /^\+?92[3-9]\d{8}$/, // Pakistan: +92 followed by 3-9 and 8 digits
      LK: /^\+?94\d{9}$/, // Sri Lanka: +94 and 9 digits
    };
    const cc = {
      IN: "+91", // India: Starts with +91 or 91 and 10 digits (6-9)
      AF: "+93", // Afghanistan: +93 and 9 digits
      BD: "+880", // Bangladesh: +880 followed by 1 and 9 digits
      BT: "+975", // Bhutan: +975 and 8 digits
      CN: "+86", // China: +86 and 11 digits
      MM: "+95", // Myanmar: +95 and 7 to 10 digits
      NP: "+977", // Nepal: +977 and 8 digits
      PK: "+92", // Pakistan: +92 followed by 3-9 and 8 digits
      LK: "+94", // Sri Lanka: +94 and 9 digits
    };
    const pattern = phonePatterns[country];
    const new_val =
      pattern?.test(phone ?? "") || pattern?.test(cc[country] + phone);
    setValidPhone((val) => new_val);
    return;
  }
  return (
    <>
      {open && <InformationModal toggle={toggleModal} information={display} />}
      <div className={`${styles.contactpage}`}>
        <motion.p
          className={`${styles.contactTitle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Contact Us
        </motion.p>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: spring }}
          style={{ stiffness: 400, damping: 20 }}
          className={`${styles.contactDetails}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          debitis facere quia praesentium at corporis, dolore laboriosam
          voluptas eaque aut quo voluptates! Neque rerum eos odit amet voluptate
          magni aliquid libero porro nesciunt aut, ipsum veniam aperiam optio
          fuga, possimus facere modi enim doloremque blanditiis adipisci minima.
          Impedit, molestias nesciunt?
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: spring }}
          style={{ stiffness: 400, damping: 20 }}
          className={`${styles.contactCard}`}
          onClick={() => {
            toggleModal();
            setDisplay((e) => "PhoneNumber");
          }}
        >
          <div className={`${styles.logo}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              fill="black"
            >
              <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
            </svg>
          </div>
          <p>Phone Number</p>
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: spring }}
          style={{ stiffness: 400, damping: 20 }}
          className={`${styles.contactCard2}`}
          onClick={() => {
            toggleModal();
            setDisplay((e) => "Email");
          }}
        >
          <div className={`${styles.logo}`}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="black"
              color="#000"
            >
              <path d="M4,20 C4,17 8,17 10,15 C11,14 8,14 8,9 C8,5.667 9.333,4 12,4 C14.667,4 16,5.667 16,9 C16,14 13,14 14,15 C16,17 20,17 20,20" />{" "}
            </svg>
          </div>
          <p>Email</p>
        </motion.div>

        <div className={`${styles.contactForm}`}>
          <motion.p
            className={`${styles.inquiryTitle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Inquiry ?{" "}
          </motion.p>
          <motion.p
            className={`${styles.inquiryTitle}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: spring }}
            style={{ stiffness: 400, damping: 20 }}
          >
            Fill The Form And Reach Out.
          </motion.p>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.field}`}>
              <div className={`${styles.fieldName}`}>
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  fill="white"
                  color="#fff"
                >
                  <path d="M4,20 C4,17 8,17 10,15 C11,14 8,14 8,9 C8,5.667 9.333,4 12,4 C14.667,4 16,5.667 16,9 C16,14 13,14 14,15 C16,17 20,17 20,20" />{" "}
                </svg>
                <label className={`${styles.label}`}>Name</label>
                <div>
                  <input
                    placeholder=" Enter your name ..."
                    type="text"
                    width="max-content"
                    name="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.field}`}>
              <div className={`${styles.fieldName}`}>
                <svg
                  width="40px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="32px"
                    height="16px"
                    x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    fill="white"
                  />
                </svg>

                <label>Country </label>
              </div>
              <select
                name="Country"
                id="country"
                style={{ width: "10vw" }}
                defaultValue={"IN"}
                onChange={(e) => {
                  setCountry((c) => e.target.value);
                }}
              >
                <option value="">Select a country</option>
                <option value="AF">Afghanistan</option>
                <option value="BD">Bangladesh</option>
                <option value="BT">Bhutan</option>
                <option value="CN">China</option>
                <option value="IN">India</option>
                <option value="MM">Myanmar (Burma)</option>
                <option value="NP">Nepal</option>
                <option value="PK">Pakistan</option>
                <option value="LK">Sri Lanka</option>
              </select>
            </div>
            <div className={`${styles.field}`}>
              <div className={`${styles.fieldName}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  fill="white"
                >
                  <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                </svg>
                <label
                  className={`${styles.label}`}
                  style={{ position: "relative" }}
                >
                  {" "}
                  Phone Number
                </label>
              </div>
              <div>
                <input
                  placeholder=" Enter your number ..."
                  type="text"
                  name="Phone"
                  width="max-content"
                  onChange={(e) => {
                    validatePhoneNumber(e.target.value);
                    setPhone(e.target.value);
                  }}
                  style={{ border: validPhone ? "" : "2px solid red" }}
                />
              </div>
              {!validPhone && (
                <ErrorMessage text="The Phone Number for the given country is invalid" />
              )}
            </div>
            <fieldset>
              <legend>Inquiry</legend>
              <textarea
                className={`${styles.textArea}`}
                placeholder="Enter your inquiry for us ... "
                onChange={(e) => setInquiry((x) => e.target.value)}
              ></textarea>
            </fieldset>
            <button
              id="Send"
              type="submit"
              className={`${styles.submitButton}`}
              onClick={() => {
                console.log(name + " " + phone + " " + country + " " + inquiry);
              }}
            >
              Send!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
