import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

function BackgroundAnimation() {
  const snowBellsCount = isMobile ? 40 : 80;

  let a = [];
  let a2 = [];
  const height = window.innerHeight;
  const width = window.innerWidth;

  function getRandomHeight() {
    return Math.floor(Math.random() * height);
  }
  function getRandomWeight() {
    let rnd = Math.floor(Math.random() * width);
    if (rnd < 30) {
      return 30;
    } else {
      if (rnd > width - 30) {
        return width - 30;
      } else {
        return rnd;
      }
    }
  }
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < snowBellsCount; i++) {
    const x = getRandomHeight();
    const b = getRandomWeight();
    const z = getRandomArbitrary(7, 9);
    const dil = getRandomArbitrary(10, 30);
    a.push(
      <motion.p
        key={i}
        style={{
          position: "absolute",
          top: x,
          left: b,
          cursor: "default",
          color: "white",
        }}
        animate={{
          // scale: [1, 2, 2, 1, 1],
          // rotate: [0, 0, 270, 270, 0],
          // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          y: [0, height],
          x: [0, dil, 0, -dil, 0],
          // opacity: [1, 0],
        }}
        transition={{
          duration: z,
          ease: "linear",
          // repeatType: "reverse",
          // times: [0, 1],
          repeat: Infinity,
        }}
      >
        ❄
      </motion.p>
    );
    a2.push(
      <motion.p
        key={i}
        style={{
          position: "absolute",
          top: x - height,
          left: b,
          cursor: "default",
          color: "white",
        }}
        animate={{
          // scale: [1, 2, 2, 1, 1],
          // rotate: [0, 0, 270, 270, 0],
          // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          // y: [0, height + Math.floor(Math.random() * height)],
          y: [0, height],
          x: [0, dil, 0, -dil, 0],
          // opacity: [1, 0],
        }}
        transition={{
          duration: z,
          ease: "linear",
          // repeatType: "reverse",
          // times: [0, 1],
          repeat: Infinity,
        }}
      >
        ❄
      </motion.p>
    );
  }
  return (
    <div className="background w-screen h-screen absolute">
      {a2 &&
        a2.map((item) => {
          return item;
        })}
      {a &&
        a.map((item) => {
          return item;
        })}
    </div>
  );
}
// add react memo to cancel rerenders! (love that)
export default React.memo(BackgroundAnimation);
