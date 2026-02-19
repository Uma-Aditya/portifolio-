import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Magnetic from './Magnetic';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
                <Magnetic>
                    <a
                        href="#"
                        className="block bg-neo-white dark:bg-[#1a1a1a] dark:text-white border-2 border-black dark:border-gray-500 px-4 py-1 text-2xl font-black shadow-hard hover:bg-neo-yellow dark:hover:bg-neo-purple transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-hover"
                    >
                        ADITYA.exe
                    </a>
                </Magnetic>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex gap-4 bg-white/10 backdrop-blur-md border-2 border-black dark:border-gray-500 p-2 shadow-hard glass-panel">
                        {['ABOUT', 'SKILLS', 'WORK'].map((item) => (
                            <Magnetic key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white dark:text-white dark:hover:bg-neo-green dark:hover:text-black transition-colors cursor-hover"
                                >
                                    /{item}
                                </a>
                            </Magnetic>
                        ))}
                        <Magnetic>
                            <a
                                href="#contact"
                                className="block px-3 py-1 font-mono font-bold text-sm bg-neo-yellow text-black border-2 border-black dark:border-neo-yellow hover:bg-neo-pink transition-colors cursor-hover shadow-[2px_2px_0_rgba(0,0,0,1)]"
                            >
                                HIRE ME
                            </a>
                        </Magnetic>
                    </div>

                    <Magnetic>
                        <button
                            onClick={toggleTheme}
                            className="w-11 h-11 flex items-center justify-center bg-neo-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-500 shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-hover relative overflow-hidden"
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'dark' ? 0 : -90, scale: theme === 'dark' ? 1 : 0.5, opacity: theme === 'dark' ? 1 : 0 }}
                                className="absolute text-neo-yellow"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'dark' ? 90 : 0, scale: theme === 'dark' ? 0.5 : 1, opacity: theme === 'dark' ? 0 : 1 }}
                                className="absolute text-black"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </motion.div>
                        </button>
                    </Magnetic>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
