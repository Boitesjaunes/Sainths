import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import SnowFlake from "./snowflake3.svg";

function BackgroundAnimation() {
  const snowflakesCount = isMobile ? 20 : 60;

  // variables to store snowflakes
  let a = [];
  let a2 = [];
  const height = window.innerHeight;
  const width = window.innerWidth;

  // get random integer for snowflakes
  function getRandomHeight() {
    return Math.floor(Math.random() * height);
  }

  // get x postion for snowflakes (- and + some px to dont have snowflakes outside)
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
  // get random integer beetwen 2 numbers
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const SN = SnowFlake;
  // create snowflakes and giv atribute to they. after that they are pushed to array
  for (let i = 0; i < snowflakesCount; i++) {
    const x = getRandomHeight();
    const b = getRandomWeight();
    const z = getRandomArbitrary(7, 9);
    const dil = getRandomArbitrary(10, 30);
    a.push(
      <motion.img
        className="absolute h-4 w-4 cursor-default fill-white"
        key={i}
        src={SN}
        style={{
          top: x,
          left: b,
        }}

        animate={{
          y: [0, height],
          x: [0, dil, 0, -dil, 0],
        }}
        transition={{
          duration: z,
          ease: "linear",
          repeat: Infinity,
        }}
      >

      </motion.img>
    );
    a2.push(
      <motion.img
        className="absolute h-4 w-4 cursor-default fill-white"
        key={i}
        src={SN}
        style={{
          top: x - height,
          left: b,
        }}
        animate={{
          y: [0, height],
          x: [0, dil, 0, -dil, 0],
        }}
        transition={{
          duration: z,
          ease: "linear",
          repeat: Infinity,
        }}
      >

      </motion.img>
    );
  }
  return (
    // render two arrays with the snowflakes
    <div className="background w-screen h-screen fixed">
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
