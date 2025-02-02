import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContentful } from "../../useContentful";
import PhoneNumberModal from "./PhoneNumberModal.jsx";
import Loader from "../Loader/Loader.jsx";
import Error from "../Error/Error.jsx";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { ProductId } = useParams();
  const { getProduct } = useContentful();
  const [load, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [product, setProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    sessionStorage.getItem("phoneNumber") ?? "NoPhoneNumber"
  );
  const [userName, setUserName] = useState(
    sessionStorage.getItem("userName") ?? "NoUserName"
  );
  const [formData, setFormData] = useState({
    senderName: "John Doe",
    senderEmail: "john@example.com",
    subject: "Inquiry email",
    message: "This is a test message",
  });

  useEffect(() => {
    getProduct(ProductId)
      .then((item) => {
        setProduct(item);
        setLoading(false);
      })
      .catch((error) => {
        setErr(error);
        setLoading(false);
      });
  }, [ProductId]);

  useEffect(() => {
    setFormData((f) => ({
      ...f,
      senderName: userName,
      message: `This is an inquiry for ${product?.productName} by ${userName} with phone number:${phoneNumber}`,
    }));
  }, [userName, phoneNumber]);

  function toggleFormModal() {
    setOpenModal((a) => !a);
  }

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
      <style>
        {`
            .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #000;
            border: none;
            padding: 10px;
            border-radius : 5px;
            cursor: pointer;
            color: #fff;
            font-size: 16px;
            margin-bottom: 16px;
            font-weight : bolder;
          }

          .back-button:hover {
            color: #2196F3;
          }

          .product-page {
            max-width: max-content;
            margin: 5% 5%;
            padding: 20px;
            font-family: Arial, sans-serif;
            border:none;
          }

          .product-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            overflow: hidden;
          }

          .image-container {
            width: 100%;
            overflow: hidden;
            border-radius : 10px;
          }

          .product-image {
            margin : auto;
            width: 30%;
            height: 60%;
            border-radius : 10px;
          }

          .content-container {
            padding: 0 24px 24px;
          }

          .product-title {

            font-size: 28px;
            color: #fff;
            text-shadow : 0 0 5px white;
            margin: 0 0 16px 0;
            line-height: 1.3;
            font-weight : bolder;
          }

          .product-details {
            font-size: 16px;
            line-height: 1.6;
            color: #fff;
            font-weight:bold;
            margin-bottom: 24px;
          }

          .inquiry-button {
            background-color: #000;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 6px;
            cursor: pointer;
            width: 10%;
            font-weight: 500;
          }

          .inquiry-button:hover {
            background-color: #1976D2;
          }

          @media (max-width: 768px) {
            .product-page {
              position : absolute;
              top:10%;
              padding: 16px;
            }

            .content-container {
              padding: 0 16px 16px;
            }

            .product-title {
              font-size: 24px;
              margin-bottom: 12px;
            }

            .product-details {
              font-size: 15px;
              margin-bottom: 20px;
            }
            
            .inquiry-button{
              width : max-content;
            }

            .product-image{
            margin : auto;
            width: 60%;
            height: 70%;
            }
          }

          @media (max-width: 480px) {
            .product-page {
              position : absolute;
              top:10%;
              padding: 12px;
            }

            .product-title {
              font-size: 20px;
            }

            .product-details {
              font-size: 14px;
            }

            .inquiry-button {
              padding: 12px 20px;
              font-size: 15px;
              width : max-content;
            }
              
            .product-image{
              margin : auto;
              width: 60%;
              height: 70%;
            }
          }
        `}
      </style>

      {load && <Loader />}
      {err && <Error key={err} />}
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
      <div className="product-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="product-container">
          <div className="image-container">
            <img
              src={"https:" + product?.productImage?.fields?.file?.url}
              alt={`This is ${product?.productName}`}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product?.productName}</h1>
            <p className="product-details">{product?.productDescription}</p>
            <button className="inquiry-button" onClick={() => sendMessage()}>
              Inquiry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
