import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const TerminalText = ({ text, delay = 0. }) => {
    const [displayed, setDisplayed] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [isInView, text, delay]);

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(blink);
    }, []);

    return (
        <span ref={ref} className="font-mono">
            {displayed}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
        </span>
    );
};

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const num = parseInt(end) || 0;
        if (num === 0) return;
        const step = Math.max(1, Math.floor(num / (duration / 30)));
        let current = 0;
        const interval = setInterval(() => {
            current += step;
            if (current >= num) {
                setCount(num);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const CodingStats = () => {
    const [stats, setStats] = useState({
        repos: '--',
        followers: '--',
        joined: '--',
        commits: '--'
    });

    useEffect(() => {
        fetch('https://api.github.com/users/Uma-Aditya')
            .then(res => res.json())
            .then(data => {
                const joinedDate = new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
                const estimatedContribs = (data.public_repos * 20) + (data.followers * 5);
                setStats({
                    repos: data.public_repos || '0',
                    followers: data.followers || '0',
                    joined: joinedDate,
                    commits: `${estimatedContribs}+`
                });
            })
            .catch(err => console.error("GH fetch error", err));
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const statItems = [
        { label: 'REPOSITORIES', value: stats.repos, color: 'neo-green' },
        { label: 'FOLLOWERS', value: stats.followers, color: 'neo-green' },
        { label: 'COMMITS', value: stats.commits, color: 'neo-green' },
        { label: 'JOINED', value: stats.joined, color: 'neo-green' },
    ];

    return (
        <section id="coding-stats" className="py-16 md:py-24 bg-neo-black text-white relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: 'linear-gradient(rgba(51,255,87,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(51,255,87,0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }}></div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-neo-green/30 rounded-full"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${10 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b-2 border-neo-green/30 pb-4">
                    <ScrollReveal>
                        <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter">
                            CODING<span className="text-neo-green">_STATS</span>
                        </h2>
                    </ScrollReveal>
                    <motion.div
                        className="flex items-center gap-2 mt-2 md:mt-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-2.5 h-2.5 bg-neo-green rounded-full shadow-[0_0_8px_rgba(51,255,87,0.6)]"></div>
                        <p className="font-mono text-neo-green text-xs font-bold tracking-wider">LIVE_DATA</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* GitHub Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col h-full border-2 border-neo-green/40 bg-[#0a0a0a] relative group"
                    >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neo-green"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neo-green"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neo-green"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neo-green"></div>

                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 30px rgba(51,255,87,0.05), 0 0 20px rgba(51,255,87,0.08)' }}></div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-neo-green/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border-2 border-neo-green/50 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase text-white tracking-wide">Uma-Aditya</h3>
                                    <p className="text-neo-green/60 font-mono text-[10px] uppercase tracking-widest">PROBLEM SOLVER</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <motion.span
                                    className="text-neo-green font-black text-2xl"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring' }}
                                >
                                    {stats.commits !== '--' ? stats.commits : '...'}
                                </motion.span>
                                <p className="text-white/40 font-mono text-[9px] uppercase tracking-wider">COMMITS</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 p-5">
                            {statItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    className="border border-neo-green/20 bg-neo-black/80 p-4 hover:border-neo-green/60 transition-all duration-300 group/stat relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-neo-green/[0.02] group-hover/stat:bg-neo-green/[0.05] transition-colors duration-300"></div>
                                    <div className="relative">
                                        <div className="text-[9px] font-mono text-neo-green/70 mb-1.5 uppercase tracking-[0.2em]">{item.label}</div>
                                        <div className="text-white font-black text-2xl tracking-tighter">{item.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contribution Chart */}
                        <div className="mx-5 mb-5 flex-1">
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0.8 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="border border-neo-green/20 p-3 bg-black/60 overflow-hidden hover:border-neo-green/40 transition-colors duration-300"
                            >
                                <div className="text-[9px] font-mono text-neo-green/50 mb-2 uppercase tracking-[0.15em]">MATRIX_OUTPUT</div>
                                <img src="https://ghchart.rshah.org/33FF57/Uma-Aditya" alt="Github Chart" className="w-full h-auto filter brightness-110" />
                            </motion.div>
                        </div>

                        {/* Terminal Footer */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-neo-green/20 bg-black/40">
                            <div className="text-neo-green/60 text-[11px] font-mono">
                                <span className="text-neo-green/40">$ </span>
                                <TerminalText text="gh --stats" delay={800} />
                            </div>
                            <a
                                href="https://github.com/Uma-Aditya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neo-green px-3 py-1.5 font-mono font-bold text-[11px] uppercase border border-neo-green/50 hover:bg-neo-green hover:text-black transition-all duration-300 tracking-wider flex items-center gap-1.5"
                            >
                                VIEW_GH <span className="text-xs">→</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* LeetCode Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-col h-full border-2 border-neo-orange/40 bg-[#0a0a0a] relative group"
                    >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neo-orange"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neo-orange"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neo-orange"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neo-orange"></div>

                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 30px rgba(255,159,28,0.05), 0 0 20px rgba(255,159,28,0.08)' }}></div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-neo-orange/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border-2 border-neo-orange/50 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-neo-orange fill-current">
                                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.602.5c.55.457 1.38.37 1.836-.18a1.304 1.304 0 0 0-.18-1.835l-.601-.502z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase text-white tracking-wide">Uma-Aditya</h3>
                                    <p className="text-neo-orange/60 font-mono text-[10px] uppercase tracking-widest">PROBLEM SOLVER</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <motion.span
                                    className="text-neo-orange font-black text-lg"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, type: 'spring' }}
                                >
                                    #Top
                                </motion.span>
                                <p className="text-neo-orange/40 font-mono text-[9px] uppercase tracking-wider">RANKING</p>
                            </div>
                        </div>

                        {/* LeetCode Card Image */}
                        <div className="flex-1 flex flex-col justify-center p-5">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="border border-neo-orange/20 p-3 bg-black/60 overflow-hidden hover:border-neo-orange/40 transition-colors duration-300"
                            >
                                <img
                                    src="https://leetcard.jacoblin.cool/Uma-Aditya?theme=dark&font=Ubuntu&ext=heatmap"
                                    alt="LeetCode"
                                    className="w-full h-auto object-contain max-h-[320px]"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </motion.div>
                        </div>

                        {/* Terminal Footer */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-neo-orange/20 bg-black/40">
                            <div className="text-neo-orange/60 text-[11px] font-mono">
                                <span className="text-neo-orange/40">$ </span>
                                <TerminalText text="leetcode --u" delay={1200} />
                            </div>
                            <a
                                href="https://leetcode.com/u/Uma-Aditya/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neo-orange px-3 py-1.5 font-mono font-bold text-[11px] uppercase border border-neo-orange/50 hover:bg-neo-orange hover:text-black transition-all duration-300 tracking-wider flex items-center gap-1.5"
                            >
                                VIEW_LC <span className="text-xs">→</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CodingStats;
