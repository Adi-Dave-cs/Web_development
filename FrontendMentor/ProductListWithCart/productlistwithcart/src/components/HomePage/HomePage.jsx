import styles from "./HomePage.module.css";
import { motion, spring } from "motion/react";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";

function Loading() {
  return (
    <>
      <div className={`${styles.loading}`}></div>
    </>
  );
}
export default function HomePage() {
  return (
    <>
      <div className={`${styles.homepage}`}>
        <motion.div
          className={`${styles.homeTitle}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: spring }}
        >
          Lorem ipsum dolor sit amet.
        </motion.div>
        <motion.p
          className={`${styles.paragraph}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: spring, duration: 3.0 }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
          ad
          <span className={`${styles.badge}`}>adipisicing</span> Lorem, ipsum
          dolor.
        </motion.p>
        <Suspense fallback={<Loading />}>
          <div>
            <img
              data="image_data"
              src="https://loremflickr.com/200/200?random=1"
              className={`${styles.borderName} ${styles.imageClass} ${styles.imageTop}`}
              alt="Image-1"
            />
            <img
              data="image_data"
              src="https://loremflickr.com/200/200?random=2"
              className={`${styles.borderName} ${styles.imageClass} ${styles.imageCenter}`}
              alt="Image-2"
            />
            <img
              data="image_data"
              src="https://loremflickr.com/200/200?random=3"
              className={`${styles.borderName} ${styles.imageClass} ${styles.imageBottom}`}
              alt="Image-3"
            />
          </div>
        </Suspense>
        <NavLink to="/app/product" style={{ textDecoration: "none" }}>
          <button className={`${styles.submitButton}`}> Get Started !</button>
        </NavLink>
      </div>
    </>
  );
}
