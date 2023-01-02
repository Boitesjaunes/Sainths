import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { motion, AnimatePresence } from "framer-motion";


const leftVariants = {
    initial: {
        opacity: 0,
        x: "-100%",
        y: 0,
        transition: { duration: 1 },
    },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 1, delay: 1 },
    },
    // exit here
};

const rightVariants = {
    initial: {
        opacity: 0,
        x: "100%",
        y: 0,
        transition: { duration: 1 },
    },
    animate: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 1, delay: 1 },
    },
    // exit here
}
const showVariants = {
    initial: {
        opacity: 0,
        scale: 0,
        transition: { duration: 1 },
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1, delay: 1 },
    },
    // exit here
}

const showBackground = {
    initial: {
        scale: 2,
        transition: { duration: 1 },
    },
    animate: {
        scale: 1,
        transition: { duration: 1 },
    },
}

function ChooseTypePage() {
    return (
        <div className="w-screen h-screen flex items-center relative flex-col justify-center">
            <div className="mockup-phone">
                <div className="camera !w-44 after:!bg-gray-700 before:!bg-gray-700"></div>
                <div className="display">
                    <motion.div variants={showBackground} initial="initial" animate="animate" className="artboard artboard-demo phone-1 justify-evenly
                    pt-36 pb-24">
                        <motion.h2 variants={showVariants} initial="initial" animate="animate" className="text-xl mb-8 font-medium text-center pl-4 ">
                            Wybieraj i graj!
                            {/* font-mono text-sm bg-transparent text-blue-700 */}
                            <span className="badge badge-lg bg-green-600 !border-0 ml-4 bg-blue-700">Nowości!</span>
                        </motion.h2>

                        {/* 1 */}
                        <motion.div variants={leftVariants} initial="initial" animate="animate" className="chat chat-start self-start pl-2">
                            <Link to={"/local/main"} className="btn !flex !max-w-full chat-bubble bg-green-600 hover:bg-green-700 !border-0 text-white font-normal normal-case">
                                Graj lokalnie Serwer
                            </Link>
                        </motion.div>

                        {/* 2 */}
                        <motion.div variants={rightVariants} initial="initial" animate="animate" className="chat chat-end self-end pr-2">
                            <div className="tooltip tooltip-open " data-tip="🛠">
                                <Link title="Pracujemy nad tym!" to={"/online/main"} className="btn !flex !max-w-full chat-bubble bg-red-600 hover:bg-red-700 !border-0 !text-white font-normal normal-case" disabled>
                                    Graj Online Serwer
                                </Link>
                            </div>
                        </motion.div>

                        {/* 3 */}
                        <motion.div variants={leftVariants} initial="initial" animate="animate" className="chat chat-start self-start pl-2">
                            <Link to={"/local/user"} className="btn !flex !max-w-full chat-bubble bg-green-600 hover:bg-green-700 !border-0 text-white font-normal normal-case">
                                Graj lokalnie Gracz
                            </Link>
                        </motion.div>

                        {/* 4 */}
                        <motion.div variants={rightVariants} initial="initial" animate="animate" className="chat chat-end self-end pr-2">
                            <div className="tooltip tooltip-open " data-tip="🛠">
                                <Link title="Pracujemy nad tym!" to={"/online/user"} className="btn !flex !max-w-full chat-bubble bg-red-600 hover:bg-red-700 !border-0 !text-white font-normal normal-case" disabled>
                                    Graj Online Gracz
                                </Link>
                            </div>
                        </motion.div>




                    </motion.div>
                </div>
            </div>

        </div >
    );
}

export default ChooseTypePage;