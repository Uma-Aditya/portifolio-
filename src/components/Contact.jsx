import React from 'react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
            <ScrollReveal className="bg-white dark:bg-stone-900 border-4 border-black dark:border-gray-500 shadow-hard-xl p-8 md:p-12 relative mt-12 glass-panel">
                <div className="absolute -top-10 -left-6 bg-neo-yellow border-4 border-black dark:border-gray-500 px-6 py-2 shadow-hard rotate-[-5deg]">
                    <span className="font-black text-2xl text-black">START A PROJECT</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-6xl font-black uppercase mb-6 leading-[0.85] text-black dark:text-white">Let's<br />Talk<br />Code.</h2>
                        <p className="font-mono text-lg mb-8 text-gray-600 dark:text-gray-300">
                            I am currently available for freelance work and open to full-time opportunities.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black dark:border-gray-500">
                                    <i className="ri-mail-line text-xl"></i>
                                </div>
                                <a href="mailto:mohanaditya706@gmail.com" className="text-xl font-bold hover:bg-neo-blue cursor-hover text-black dark:text-white">mohanaditya706@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black dark:border-gray-500">
                                    <i className="ri-phone-line text-xl"></i>
                                </div>
                                <span className="text-xl font-bold text-black dark:text-white">+91 9666706734</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center border-2 border-black dark:border-gray-500">
                                    <i className="ri-map-pin-line text-xl"></i>
                                </div>
                                <span className="text-xl font-bold text-black dark:text-white">Kakinada, India</span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6 bg-gray-50 dark:bg-stone-800 p-6 border-2 border-black dark:border-gray-500">
                        <div className="flex flex-col">
                            <label className="font-mono font-bold mb-1 uppercase text-xs text-gray-800 dark:text-gray-300">Identity</label>
                            <input type="text" placeholder="NAME / COMPANY" className="bg-white dark:bg-stone-900 border-2 border-black dark:border-gray-500 p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all cursor-hover dark:text-white" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-mono font-bold mb-1 uppercase text-xs text-gray-800 dark:text-gray-300">Coordinates</label>
                            <input type="email" placeholder="EMAIL ADDRESS" className="bg-white dark:bg-stone-900 border-2 border-black dark:border-gray-500 p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all cursor-hover dark:text-white" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-mono font-bold mb-1 uppercase text-xs text-gray-800 dark:text-gray-300">Transmission</label>
                            <textarea rows="4" placeholder="PROJECT DETAILS..." className="bg-white dark:bg-stone-900 border-2 border-black dark:border-gray-500 p-3 font-bold focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all resize-none cursor-hover dark:text-white"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-neo-blue text-white font-black text-xl py-4 border-2 border-black dark:border-gray-500 shadow-hard neo-button hover:bg-neo-black hover:translate-y-1 hover:shadow-none transition-all cursor-hover">TRANSMIT DATA</button>
                    </form>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Contact;
