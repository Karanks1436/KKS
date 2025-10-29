

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

// 🧩 Firebase imports (ADDED)
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export default function Friend() {
  const [stage, setStage] = useState("cakeIntro");
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCutStage, setCakeCutStage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // 🎁 Added states for wishes system
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  const PHOTOS = [
   "hari.png",
   "hari1.png",
   "hari2.png",
   "hari3.png",
  ];

  // Background music
  const music = new Audio("Yaara Teri Yaari Ko Mashup - 320Kbps-(Mr-Jat.in).mp3");

  useEffect(() => {
    if (musicPlaying) {
      music.loop = true;
      music.play();
    } else {
      music.pause();
    }
    return () => music.pause();
  }, [musicPlaying]);

  // 🔥 Firestore listener for wishes (ADDED)
  useEffect(() => {
    const q = query(collection(db, "birthdayWishesfriend"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWishes(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const startCelebration = () => {
    setShowCelebration(true);
    setMusicPlaying(true);
  };

  const blowCandles = () => {
    setCandlesLit(false);
    new Audio("https://cdn.pixabay.com/download/audio/2021/09/28/audio_5b6a366be0.mp3").play();
  };

  const cutCake = () => {
    new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_57743ab627.mp3").play();
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

  // 💌 Function to send wishes (ADDED)
  const sendWish = async () => {
    if (!name.trim() || !message.trim()) return;
    await addDoc(collection(db, "birthdayWishesfriend"), {
      name,
      message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
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
            {cakeCutStage < 3 && (
              <>
                {cakeCutStage < 3 && <div className="layer layer1"></div>}
                {cakeCutStage < 2 && <div className="layer layer2"></div>}
                {cakeCutStage < 1 && <div className="layer layer3"></div>}
              </>
            )}

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
          <h2>💞 Memories with Friend 💞</h2>
          <p className="final-message">
            “You’ve been my constant through every storm and sunshine. On your birthday, I just want to remind you how deeply you’re loved and appreciated. Happy Birthday, my forever friend.”
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

      {/* 💬 Birthday Wishes Section (ADDED) */}
      <motion.div
        className="wishes-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3>💌 Send Your Birthday Wish</h3>
        <div className="wish-inputs">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendWish}>Send 💬</button>
        </div>

        <div className="wishes-chat">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              className="wish-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <strong>{wish.name}:</strong> <span>{wish.message}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
