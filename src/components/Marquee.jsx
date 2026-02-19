import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="border-y-4 border-black bg-neo-blue py-3 relative z-20 overflow-hidden">
            <motion.div
                className="whitespace-nowrap font-mono font-bold text-2xl text-white flex w-max"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {/* Duplicated content for seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="mx-4">
                /// FULL STACK DEVELOPER /// MERN STACK /// CLEAN CODE /// RESPONSIVE DESIGN /// USER FOCUSED /// PASSIONATE /// PROBLEM SOLVER
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
