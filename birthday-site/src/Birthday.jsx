import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

export default function BirthdayDad() {
  const [stage, setStage] = useState("cakeIntro");
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCutStage, setCakeCutStage] = useState(0); // tracks how many slices are removed
  const [showCelebration, setShowCelebration] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const PHOTOS = [
    "IMG_20250314_123455.jpg",
    "IMG-20240415-WA0034.jpg",
    "IMG-20241028-WA0005.jpg",
    "IMG-20250924-WA0010.jpg",
  ];

  // Background music
  const music = new Audio("birthdaysong.mp3");

  useEffect(() => {
    if (musicPlaying) {
      music.loop = true;
      music.play();
    } else {
      music.pause();
    }
    return () => music.pause();
  }, [musicPlaying]);

  const startCelebration = () => {
    setShowCelebration(true);
    setMusicPlaying(true);
  };

  const blowCandles = () => {
    setCandlesLit(false);
    new Audio("https://cdn.pixabay.com/download/audio/2021/09/28/audio_5b6a366be0.mp3").play();
  };

  const cutCake = () => {
    // play sound
    new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_57743ab627.mp3").play();
    // start slice removal animation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCakeCutStage(step);
      if (step === 3) {
        clearInterval(interval);
        setTimeout(() => setStage("gallery"), 1500);
      }
    }, 800);
  };

  return (
    <div className="birthday-dad-page">
      {/* 🎊 Confetti */}
      {showCelebration && <Confetti recycle={true} gravity={0.3} />}

      {/* 🕯️ Stage 1: Cake Intro */}
      {stage === "cakeIntro" && (
        <motion.div
          className="cake-intro"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/027/098/526/small/birthday-cake-with-candles-isolated-png.png"
            alt="Birthday Cake"
            className="cake-image"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startCelebration}
          >
            Start Celebration 🎉
          </motion.button>
        </motion.div>
      )}

      {/* 🎂 Stage 2: Cake Celebration */}
      {showCelebration && stage === "cakeIntro" && (
        <motion.div
          className="cake-celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`cake ${candlesLit ? "lit" : ""} ${
              cakeCutStage > 0 ? "cut" : ""
            }`}
          >
            {/* Cake Layers that disappear one by one */}
            {cakeCutStage < 3 && (
              <>
                {cakeCutStage < 3 && <div className="layer layer1"></div>}
                {cakeCutStage < 2 && <div className="layer layer2"></div>}
                {cakeCutStage < 1 && <div className="layer layer3"></div>}
              </>
            )}

            {/* Candles */}
            {candlesLit && (
              <div className="candles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="candle">
                    <div className="flame"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cake-buttons">
            {candlesLit && <button onClick={blowCandles}>Blow Candles 🕯️</button>}
            {!candlesLit && cakeCutStage === 0 && (
              <button onClick={cutCake}>Cut Cake 🍰</button>
            )}
          </div>
        </motion.div>
      )}

      {/* 💞 Stage 3: Gallery */}
      {stage === "gallery" && (
        <motion.div
          className="gallery"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2>💞 Memories with Dad 💞</h2>
          <p className="final-message">
            To the best dad in the world, thank you for your love, guidance, and laughter.
            You are my hero, my inspiration, and my forever friend. Happy Birthday Dad! ❤️
          </p>

          <div className="photo-grid">
            {PHOTOS.map((src, i) => (
              <motion.div
                key={i}
                className="photo-frame"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                <img src={src} alt={`memory-${i}`} />
              </motion.div>
            ))}
          </div>

          <button onClick={() => window.location.reload()}>Replay 🎬</button>
          <p>Made by Karanks1436 with love.</p>
        </motion.div>
      )}
    </div>
  );
}
