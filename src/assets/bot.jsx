import React, { useRef, useState, useEffect } from "react";
// import download from "../Image/download.png";

const Bot = () => {
  const chatbotRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      // Click outside the chatbot, close it
      setIsOpen(false);
    } else {
      // Toggle chatbot visibility on icon click
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      ref={chatbotRef}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1000",
        cursor: "pointer",
      }}
    >
      <div onClick={handleClick}>
        <img
          src=""
          alt="Excersise Bot"
          style={{ width: "80px", height: "auto" }}
        />
      </div>
      {isOpen && (
        <iframe
          src="https://webchat.botframework.com/embed/mybottestservices-bot?s=CoKtvapHS3g.lfkbtxHqKSkdU3SPiO31VQmngGMZDrDvnL1k1iuOu-Q"
          style={{
            border: "none",
            display: "block",
            minWidth: "400px",
            width: "100%",
            minHeight: "500px",
          }}
        ></iframe>
      )}
    </div>
  );
};

export default Bot;
