import React from "react";

const ErrorPage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f9fc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    errorCode: {
      fontSize: "120px",
      fontWeight: "bold",
      color: "#1a1a1a",
      margin: "0",
      lineHeight: "1",
      position: "relative",
    },
    title: {
      fontSize: "24px",
      color: "#4a5568",
      marginTop: "16px",
      marginBottom: "24px",
    },
    description: {
      fontSize: "16px",
      color: "#718096",
      maxWidth: "400px",
      marginBottom: "32px",
      lineHeight: "1.6",
    },
    link: {
      display: "inline-block",
      padding: "12px 24px",
      backgroundColor: "#3182ce",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "500",
      transition: "background-color 0.2s ease",
      cursor: "pointer",
    },
    illustration: {
      width: "300px",
      height: "200px",
      marginBottom: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    circle: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      border: "8px solid #3182ce",
      position: "relative",
      animation: "pulse 2s infinite",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .link:hover {
            background-color: #2c5282;
          }
        `}
      </style>

      <div style={styles.illustration}>
        <div style={styles.circle} />
      </div>

      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.description}>
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <a href="/" style={styles.link} className="link">
        Return to Home
      </a>
    </div>
  );
};

export default ErrorPage;
