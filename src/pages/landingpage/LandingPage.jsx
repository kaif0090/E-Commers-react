import "./landing.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./landing.css"; // Add your styles here

export default function LandingPage() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-container mainLanding">
      {/* Animated Text */}
      <motion.h1
        // initial={{ x: "100vw" }}
        // animate={{ x: 0 }}
        // transition={{ duration: 2, type: "spring", bounce: 0.3 }}
        className="animated-text text-center"
        style={{ marginTop: "100px" }}
      >
        <div className="content">
          <h1 className="title">
            The Beautiful Bazar
            <div className="aurora">
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
            </div>
          </h1>
          <p className="subtitle tracking-in-contract">Here you want what you want</p>
        </div>
      </motion.h1>

      {/* Buttons appear after 5 seconds */}
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="button-group"style={{marginTop:"-100px"}}
        >
          <div className="d-flex gap-5  justify-content-center">
            <button className="uiverse" onClick={() => navigate("/signup")}>
              <div className="wrapper">
                <span>User</span>
                <div className="circle circle-12"></div>
                <div className="circle circle-11"></div>
                <div className="circle circle-10"></div>
                <div className="circle circle-9"></div>
                <div className="circle circle-8"></div>
                <div className="circle circle-7"></div>
                <div className="circle circle-6"></div>
                <div className="circle circle-5"></div>
                <div className="circle circle-4"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-1"></div>
              </div>
            </button>

            <button className="uiverse" onClick={() => navigate("/login")}>
              <div className="wrapper">
                <span>Admin</span>
                <div className="circle circle-12"></div>
                <div className="circle circle-11"></div>
                <div className="circle circle-10"></div>
                <div className="circle circle-9"></div>
                <div className="circle circle-8"></div>
                <div className="circle circle-7"></div>
                <div className="circle circle-6"></div>
                <div className="circle circle-5"></div>
                <div className="circle circle-4"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-1"></div>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
