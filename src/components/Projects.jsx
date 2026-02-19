import React from 'react';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-neo-yellow border-t-4 border-black dark:border-gray-500 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <h2 className="text-6xl md:text-9xl font-black mb-16 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-stroke-black" style={{ WebkitTextStroke: '3px black' }}>
                        Selected Works
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ScrollReveal direction="left" className="group bg-white dark:bg-stone-800 border-4 border-black dark:border-gray-500 p-4 shadow-hard card-tilt relative glass-panel">
                        <div className="bg-black border-2 border-black dark:border-gray-500 aspect-video relative overflow-hidden mb-6">
                            <img src="/Assets/images/Ecotrack.png" alt="Eco-Track" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-4xl font-black uppercase mb-2 text-neo-purple">ECO-TRACK</h3>
                                <p className="font-mono text-sm mb-4 text-gray-700 dark:text-gray-300">
                                    A responsive web application supporting waste management and recycling coordination.
                                </p>
                                <div className="flex gap-2 font-mono text-xs font-bold flex-wrap">
                                    {['React', 'JavaScript', 'CSS', 'Vercel'].map(tag => (
                                        <span key={tag} className="bg-neo-black text-white px-2 py-1">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <a href="https://eco-track-responsibility-in-every-r.vercel.app/" target="_blank" className="w-12 h-12 border-2 border-black bg-neo-green flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-hover shadow-hard-sm">
                                <i className="ri-arrow-right-up-line text-2xl"></i>
                            </a>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" className="bg-white dark:bg-stone-800 border-4 border-black dark:border-gray-500 p-4 shadow-hard mt-0 md:mt-20 card-tilt relative glass-panel">
                        <div className="bg-black border-2 border-black dark:border-gray-500 aspect-video relative overflow-hidden mb-6">
                            <img src="/Assets/images/directory.png" alt="Directory Sys" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-4xl font-black uppercase mb-2 text-neo-blue">DIRECTORY SYS</h3>
                                <p className="font-mono text-sm mb-4 text-gray-700 dark:text-gray-300">
                                    Employee directory system managing 500+ staff with PHP, MySQL, and Tailwind CSS.
                                </p>
                                <div className="flex gap-2 font-mono text-xs font-bold flex-wrap">
                                    {['PHP', 'MySQL', 'Tailwind CSS'].map(tag => (
                                        <span key={tag} className="bg-neo-black text-white px-2 py-1">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <a href="https://github.com/Uma-Aditya" target="_blank" className="w-12 h-12 border-2 border-black bg-neo-green flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-hover shadow-hard-sm">
                                <i className="ri-arrow-right-up-line text-2xl"></i>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="text-center mt-24">
                    <a href="https://github.com/Uma-Aditya" target="_blank" rel="noopener noreferrer" className="inline-block bg-neo-black text-white px-12 py-5 font-bold font-mono text-xl hover:bg-neo-white hover:text-black border-4 border-black transition-all shadow-hard hover:shadow-none cursor-hover">
                        VIEW ALL REPOS ON GITHUB
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
