import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

// define properties of specify alerts type
const types = {
  error: [" bg-red-100 ", " text-red-900 ", " bg-red-600 ", " text-red-400 "],
  succes: [
    " bg-green-100 ",
    " text-green-900 ",
    " bg-green-600 ",
    " text-green-400 ",
  ],
  info: [
    " bg-blue-100 ",
    " text-blue-900 ",
    " bg-blue-600 ",
    " text-blue-400 ",
  ],
};
function Alert({ type, data, socket }) {
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [color, setColor] = useState(types.error);
  useEffect(() => {
    socket.on("message", (data) => {
      // on get message switch get type of message and set state to get  specify alert
      switch (data.type) {
        case "error":
          setColor(types.error);
          break;
        case "info":
          setColor(types.info);
          break;
        case "succes":
          setColor(types.succes);
          break;
        default:
          setColor(types.error);
          break;
      }
      setAlertData({ type: data.title, data: data.value });

      setAlert(true);
      // set setTimeout for take time to alert exit
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });
  });

  //create css objects for framer 
  const notificationVariants = {
    initial: {
      opacity: 0,
      x: isMobile ? "100vw" : "40vw",
      y: 0,
      transition: { duration: 1 },
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 2 },
    },
    exit: {
      opacity: 0,
      x: isMobile ? "100vw" : "40vw",
      y: 0,
      transition: { duration: 1 },
    },
  };
  const barVariants = {
    initial: {
      x: 0,
      transition: { delay: 0, duration: 1, ease: "linear" },
    },
    animate: {
      x: "-100%",
      transition: { delay: 2, duration: 3, ease: "linear" },
    },
  };

  return (
    // use AnimatePresence component to can use exit method
    <AnimatePresence>
      {alert && (
        <motion.div
          variants={notificationVariants} // Defined animation states
          initial="initial" // Starting animation
          animate="animate" // Values to animate to
          exit="exit"
          className={
            // define width of alert on mobile and pc
            (isMobile ? "w-3/4" : "w-2/4") +
            " rounded  py-6 pt-0 pl-0 pr-0 shadow-md absolute bottom-4 right-4 z-50 overflow-hidden " +
            color[0] +
            color[1]
          }
        >
          <motion.div
            variants={barVariants}
            className={"w-full h-3 mb-2 " + color[2]}
          ></motion.div>
          <div className="flex pl-3 pr-3">
            <div className="py-1">
              <svg
                className={"fill-current h-6 w-6  mr-4 p-0 m-0 " + color[3]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              {/* show message data */}
              <p className="font-bold text-lg">
                {alertData.type && alertData.type}
              </p>
              <p className="text-base">{alertData.data && alertData.data}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
