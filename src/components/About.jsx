import React from 'react';
import ScrollReveal from './ScrollReveal';

const About = () => {
    return (
        <section id="about" className="py-24 px-4 max-w-7xl mx-auto border-x-4 border-black dark:border-gray-500 bg-white dark:bg-stone-900 my-12 shadow-hard-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <ScrollReveal direction="left">
                        <div className="aspect-square bg-gray-200 dark:bg-gray-800 border-4 border-black dark:border-gray-500 relative shadow-hard overflow-hidden group">
                            <img
                                src="/Assets/images/img.jpg"
                                alt="Pakki Uma Aditya Mohan"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <span className="absolute top-2 left-2 bg-neo-red text-white px-2 font-mono text-xs border border-black z-10">AVATAR.JPG</span>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="md:col-span-8 flex flex-col justify-center">
                    <ScrollReveal direction="right" delay={0.2}>
                        <h2 className="text-6xl font-black uppercase mb-6 text-black dark:text-white">Who am I?</h2>
                        <p className="font-mono text-xl leading-relaxed mb-6 text-black dark:text-gray-300">
                            I am Aditya. A passionate full-stack developer with hands-on experience in modern web technologies.
                            I turn <span className="bg-neo-yellow px-1 border border-black text-black">ideas</span> into scalable digital experiences.
                        </p>
                        <p className="font-mono text-lg mb-8 text-gray-600 dark:text-gray-400 border-l-4 border-neo-purple pl-4">
                            &gt; Specialized in React, JavaScript, and MERN Stack.<br />
                            &gt; Focused on clean code and problem-solving.<br />
                            &gt; 270+ LeetCode problems solved.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <div className="bg-neo-black text-white px-4 py-2 font-mono text-sm border-2 border-transparent">
                                📍 LOCATION: WORLDWIDE
                            </div>
                            <div className="bg-neo-green text-black px-4 py-2 font-mono text-sm border-2 border-black dark:border-gray-500">
                                🟢 STATUS: AVAILABLE
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;
