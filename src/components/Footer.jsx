import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-4xl font-black mb-6">ADITYA.</h2>
                    <p className="text-gray-400 max-w-sm">
                        Full-stack developer passionate about building clean, responsive web applications. Turning ideas into reality with code.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SITEMAP</h3>
                    <ul className="space-y-2 text-gray-400">
                        {['Home', 'Works', 'About', 'Contact'].map(link => (
                            <li key={link}>
                                <a href={`#${link === 'Home' ? '' : link.toLowerCase()}`} className="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SOCIALS</h3>
                    <div className="flex gap-4">
                        <a href="https://leetcode.com/u/Uma-Aditya/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-neo-blue transition-colors cursor-hover"><i className="ri-code-fill"></i></a>
                        <a href="https://github.com/Uma-Aditya" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-neo-yellow transition-colors cursor-hover"><i className="ri-github-fill"></i></a>
                        <a href="https://www.linkedin.com/in/uma-aditya-120a18289" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-neo-purple transition-colors cursor-hover"><i className="ri-linkedin-fill"></i></a>
                        <a href="https://www.hackerrank.com/profile/mohanaditya706" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-neo-orange transition-colors cursor-hover"><i className="ri-terminal-fill"></i></a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                <p>© 2025 ADITYA.exe // SYSTEM_END</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black text-white opacity-[0.03] leading-none select-none pointer-events-none text-center">
                BRUTAL
            </div>
        </footer>
    );
};

export default Footer;
