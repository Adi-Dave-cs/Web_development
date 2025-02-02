import React from "react";

const Loader = ({ size = 40, borderWidth = 3, color = "#333333" }) => {
  const loaderStyle = {
    width: size,
    height: size,
    border: `${borderWidth}px solid #f3f3f3`,
    borderTop: `${borderWidth}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={loaderStyle} />
    </div>
  );
};

export default Loader;
