import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/SplashScreen.css";
import Life from "./Life";
import Energy from "./Energy";

import charMain1 from "../images/surfers/Surfer3.gif";
import charMain2 from "../images/surfers/Surfer2.gif";
import charMain3 from "../images/surfers/Surfer1.gif";
import charMain4 from "../images/surfers/Surfer4.gif";
import charMain5 from "../images/surfers/Surfer5.gif";

import thumb1 from "../images/surfers/CharMain/SurfChar3.png";
import thumb2 from "../images/surfers/CharMain/SurfChar2.png";
import thumb3 from "../images/surfers/CharMain/SurfChar1.png";
import thumb4 from "../images/surfers/CharMain/SurfChar4.png";
import thumb5 from "../images/surfers/CharMain/SurfChar5.png";

const SplashScreen = ({ onStart }) => {
  const surfers = [charMain1, charMain2, charMain3, charMain4, charMain5];
  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5];
  const [currentSurfer, setCurrentSurfer] = useState(0);
  const [buttonText, setButtonText] = useState("SPACEBAR");
  const [distance, setDistance] = useState(0);
  const [highestDistance, setHighestDistance] = useState(0);
  const [showDeviceError, setShowDeviceError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if the user has interacted

  // Device detection
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    // Show error only if mobile and if there has been interaction
    if (isMobile && hasInteracted) {
      setShowDeviceError(true);
    } else {
      setShowDeviceError(false);
    }
  }, [hasInteracted]);

  const handlePrev = () => {
      setHasInteracted(true);
    setCurrentSurfer((prev) => (prev === 0 ? surfers.length - 1 : prev - 1));
  };

  const handleNext = () => {
      setHasInteracted(true);
    setCurrentSurfer((prev) => (prev === surfers.length - 1 ? 0 : prev + 1));
  };

  const handleDoubleClick = () => {
      setHasInteracted(true);
    onStart(currentSurfer + 1);
  };

  const handleClick = () => {
      setHasInteracted(true);
    setButtonText("DOUBLE CLICK");
  };

  useEffect(() => {
    const savedDistance = localStorage.getItem("distance") || 0;
    setDistance(parseInt(savedDistance, 10));

    const savedHighestDistance = localStorage.getItem("highestDistance") || 0;
    setHighestDistance(parseInt(savedHighestDistance, 10));

    const handleKeyDown = (e) => {
        setHasInteracted(true);
      if (e.key === " " || e.code === "Space") {
        onStart(currentSurfer + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [onStart, currentSurfer]);

  useEffect(() => {
    if (distance > highestDistance) {
      setHighestDistance(distance);
      localStorage.setItem("highestDistance", distance);
    }
  }, [distance, highestDistance]);

  const getSurferIndex = (index) => {
    return (index + surfers.length) % surfers.length;
  };

    const closeDeviceErrorModal = () => {
        setShowDeviceError(false);
    };


  return (
    <div className="game-container">
      <div id="game-gradient"></div>
      <div id="game-bg" style={{ animation: "none", transform: "translateX(0)" }}></div>
      <div className="splash-screen" onDoubleClick={handleDoubleClick}>
        {/* Device warning popup */}
        {showDeviceError && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
              className="p-10 m-5 min-h-[80px] rounded-lg border border-white/10"
              style={{
                backdropFilter: "blur(16px) saturate(180%)",
              }}
            >
              <button
                className="absolute top-4 right-4 rounded font-bold"
                  onClick={closeDeviceErrorModal}
              >
                <FaTimes className="text-white opacity-40 transform rotate-7 font-cursive font-bold" />
              </button>

              <p className="text-white text-center font-semibold">
                This game is optimized for use on PC and laptop devices only.
              </p>
            </div>
          </div>
        )}

        <div id="dash-stats">
          <Life />
          <div className="distance-display">
            <span id="score-icon" className="icon-container">
              <svg className="icon-star" width="20px" height="20px" viewBox="0 0 20 20">
                <path
                  className="icon-fill"
                  d="M9.10433 2.89874C9.47114 2.15549 10.531 2.1555 10.8978 
                2.89874L12.8282 6.81024L17.1448 7.43748C17.9651 7.55666 18.2926 8.56464 17.699 
                9.14317L14.5755 12.1878L15.3129 16.487C15.453 17.3039 14.5956 17.9269 13.8619 
                17.5412L10.0011 15.5114L6.14018 17.5412C5.40655 17.9269 4.54913 17.3039 
                4.68924 16.487L5.4266 12.1878L2.30308 9.14317C1.70956 8.56463
                2.03708 7.55666 2.8573 7.43748L7.17389 6.81024L9.10433
                2.89874Z"
                ></path>
              </svg>
            </span>
            <span className="distance-text"> {highestDistance} m </span>
          </div>
          <Energy />
        </div>

        <div className="titles">
          <h1 className="tit1">LET'S SURF</h1>
          <p className="tit2">MY RESUME</p>
        </div>

        <div className="character-selection">
          <button
            className="arrow left"
            onClick={handlePrev}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <span id="selector-left">
              <svg
                className="icon-leftArrow"
                width="44px"
                height="44px"
                viewBox="0 0 20 20"
                style={{ margin: "0px", display: "inline-block" }}
              >
                <path
                  className="icon-fill"
                  d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7672L6.20597 10.5168C5.93004 10.2271 5.93004 9.77187 6.20597 9.4822L11.2073 4.23173C11.493 3.93181 11.9677 3.92028 12.2676 4.20597C12.5676 4.49166 12.5791 4.96639 12.2934 5.26631L7.78483 9.99949L12.2934 14.7327C12.5791 15.0326 12.5676 15.5073 12.2676 15.793Z"
                ></path>
              </svg>
            </span>
          </button>

          <div className="surfer-thumbnails">
            <img
              src={thumbnails[getSurferIndex(currentSurfer - 2)]}
              alt="Previous Surfer"
              className="surfer-thumbnail left"
              style={{ width: "55px", height: "75px", opacity: "0.3" }}
            />

            <img
              src={thumbnails[getSurferIndex(currentSurfer - 1)]}
              alt="Previous Surfer"
              className="surfer-thumbnail left"
            />

            <img
              src={surfers[currentSurfer]}
              alt="Surfer Avatar"
              className="surfer-avatar"
            />
            <img
              src={thumbnails[getSurferIndex(currentSurfer + 1)]}
              alt="Next Surfer"
              className="surfer-thumbnail right"
            />

            <img
              src={thumbnails[getSurferIndex(currentSurfer + 2)]}
              alt="Next Surfer"
              className="surfer-thumbnail right"
              style={{ width: "55px", height: "75px", opacity: "0.3" }}
            />
          </div>

          <button
            className="arrow right"
            onClick={handleNext}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <span id="selector-right">
              <svg
                className="icon-rightArrow"
                width="44px"
                height="44px"
                viewBox="0 0 20 20"
                style={{ margin: "0px", display: "inline-block" }}
              >
                <path
                  className="icon-fill"
                  d="M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <span className="start-txt">
          <span className="st-btn">{buttonText}</span> to start surfing
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;