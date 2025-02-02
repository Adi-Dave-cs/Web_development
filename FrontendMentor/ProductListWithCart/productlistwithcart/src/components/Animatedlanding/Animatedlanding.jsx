import { useEffect, useState } from "react";
import styles from "./Animate.module.css";
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

export default function Animatedlanding() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date();
    var dateVal =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setDate((d) => dateVal);
  }, []);

  return (
    <>
      <div className={`${styles.coverPage}`}>
        <motion.div
          className={`${styles.cover__title}`}
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3 }}
          style={{
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <h1>HERO SECTION</h1>
        </motion.div>
        <p className={`${styles.cover__tagline}`}>Lorem, ipsum dolor.</p>
        <p className={`${styles.date_time}`}>{date}</p>
        <p className={`${styles.line}`}></p>
        <div className={`${styles.rectangle}`}></div>
        <NavLink to="/app">
          <button className={`${styles.circle}`}>
            <svg
              height="40px"
              width="40px"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 256.409 256.409"
              space="preserve"
              color="white"
            >
              <g>
                <path
                  style={{ fill: "white" }}
                  d="M254.189,121.75L132.267,26.191c-1.898-1.632-4.574-2.012-6.853-0.974
		c-2.274,1.044-3.737,3.318-3.737,5.825v82.206L10.59,26.191c-1.898-1.632-4.574-2.012-6.853-0.974C1.458,26.262,0,28.536,0,31.043
		V225.37c0,2.518,1.479,4.808,3.78,5.842c2.306,1.028,4.993,0.615,6.886-1.061l111.006-89.924v85.143
		c0,2.518,1.479,4.808,3.786,5.842c2.301,1.028,4.993,0.615,6.88-1.061l121.917-98.763c1.382-1.224,2.176-3.057,2.154-4.835
		C256.397,124.709,255.587,122.952,254.189,121.75z M12.82,211.098V45.011l105.79,81.673L12.82,211.098z M134.492,211.098V127.76
		c0.082-0.408,0.261-0.8,0.25-1.207c0-0.392-0.174-0.745-0.25-1.12V45.011l105.79,81.673L134.492,211.098z"
                />
              </g>
            </svg>
          </button>
        </NavLink>
      </div>
    </>
  );
}
