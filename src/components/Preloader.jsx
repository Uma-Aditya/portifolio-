import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev === 100) {
                    clearInterval(interval);
                    return 100;
                }
                const diff = 100 - prev;
                const increment = Math.ceil(diff / 5) + 1; // Variable speed
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {count <= 100 && ( // Keep it simple, let parent handle unmount or use AnimatePresence logic
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                    className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center font-black text-9xl overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                    >
                        <span className="text-[20vw] leading-none tracking-tighter tabular-nums">
                            {count}%
                        </span>

                        <div className="absolute top-0 left-0 w-full h-full bg-neo-green mix-blend-difference"
                            style={{ transform: `scaleY(${count / 100})`, transformOrigin: 'bottom' }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
