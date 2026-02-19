import React, { useRef, useEffect, useCallback, useState } from 'react';
import ScrollReveal from './ScrollReveal';

/* ─────────── DATA (exact positions from index.html) ─────────── */
const NODES = [
    { id: 'react', label: 'REACT', sub: 'Library', x: 28, y: 42, type: 'hub', color: 'blue', float: 1, tip: 'React.js — Component-based UI library' },
    { id: 'tailwind', label: 'Tailwind', sub: 'Styling', x: 12, y: 20, type: 'node', color: 'pink', float: 2, tip: 'Tailwind CSS — Utility-first framework' },
    { id: 'html', label: 'HTML', sub: 'Core', x: 5, y: 40, type: 'node', color: 'orange', float: 3, tip: 'HTML5 — Semantic markup & structure' },
    { id: 'nodejs', label: 'Node.js', sub: 'Backend', x: 8, y: 62, type: 'node', color: 'green', float: 1, tip: 'Node.js — Server-side JS runtime' },
    { id: 'github', label: 'GitHub', sub: 'DevOps', x: 40, y: 16, type: 'node', color: 'purple', float: 2, tip: 'GitHub — Version control & collaboration' },
    { id: 'git', label: 'Git', sub: 'VCS', x: 42, y: 72, type: 'node', color: 'yellow', float: 3, tip: 'Git — Distributed version control' },
    { id: 'java', label: 'Java', sub: 'Language', x: 24, y: 8, type: 'node', color: 'orange', float: 1, tip: 'Java — OOP language for enterprise apps' },
    { id: 'python', label: 'Python', sub: 'Language', x: 66, y: 42, type: 'hub', color: 'green', float: 2, tip: 'Python — Web, AI & data science' },
    { id: 'ai', label: 'AI', sub: 'Intel', x: 82, y: 20, type: 'leaf', color: 'blue', float: 3, tip: 'AI — Neural networks & deep learning' },
    { id: 'ml', label: 'ML', sub: 'Data', x: 82, y: 70, type: 'leaf', color: 'pink', float: 1, tip: 'ML — Predictive models & data analysis' },
];

const CONNECTIONS = [
    { from: 'react', to: 'tailwind' },
    { from: 'react', to: 'html' },
    { from: 'react', to: 'nodejs' },
    { from: 'react', to: 'github' },
    { from: 'react', to: 'git' },
    { from: 'react', to: 'java' },
    { from: 'python', to: 'ai' },
    { from: 'python', to: 'ml' },
    { from: 'react', to: 'python', dashed: true },
];

/* ─────────── STYLES (exact CSS from index.html, injected as React style block) ─────────── */
const MIND_MAP_CSS = `
/* Container */
.mind-map-container { position: relative; min-height: 550px; }

/* Float keyframes */
@keyframes float-slow   { 0%,100% { transform: translateY(0); }   50% { transform: translateY(-14px); } }
@keyframes float-slow-2 { 0%,100% { transform: translateY(-7px); } 50% { transform: translateY(7px);  } }
@keyframes float-slow-3 { 0%,100% { transform: translateY(5px); }  50% { transform: translateY(-12px); } }
@keyframes draw-line    { to { stroke-dashoffset: 0; } }

/* Bubble base */
.mm-bubble {
    position: absolute;
    border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(255,255,255,0.15);
    cursor: grab; z-index: 10; user-select: none;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease;
}
.mm-bubble.dragging { cursor: grabbing; z-index: 50; transition: box-shadow 0.2s ease, border-color 0.2s ease; animation: none !important; border-color: rgba(255,255,255,0.6); box-shadow: 0 0 25px rgba(59,130,246,0.5); }
.mm-bubble:hover    { transform: scale(1.12) !important; border-color: rgba(255,255,255,0.5); }
.mm-bubble.active   { border-color: rgba(59,130,246,0.8); background: rgba(59,130,246,0.15); }

/* Sizes */
.mm-hub  { width: 110px; height: 110px; }
.mm-node { width: 78px;  height: 78px; }
.mm-leaf { width: 62px;  height: 62px; }

/* Color glows */
.mm-blue:hover   { box-shadow: 0 0 30px rgba(59,130,246,0.6),  0 0 60px rgba(59,130,246,0.2); }
.mm-green:hover  { box-shadow: 0 0 30px rgba(51,255,87,0.5),   0 0 60px rgba(51,255,87,0.15); }
.mm-pink:hover   { box-shadow: 0 0 30px rgba(255,112,166,0.5), 0 0 60px rgba(255,112,166,0.15); }
.mm-yellow:hover { box-shadow: 0 0 30px rgba(251,255,72,0.5),  0 0 60px rgba(251,255,72,0.15); }
.mm-purple:hover { box-shadow: 0 0 30px rgba(168,85,247,0.5),  0 0 60px rgba(168,85,247,0.15); }
.mm-orange:hover { box-shadow: 0 0 30px rgba(255,159,28,0.5),  0 0 60px rgba(255,159,28,0.15); }
.mm-blue.active   { box-shadow: 0 0 30px rgba(59,130,246,0.6); }
.mm-green.active  { box-shadow: 0 0 30px rgba(51,255,87,0.5); }
.mm-pink.active   { box-shadow: 0 0 30px rgba(255,112,166,0.5); }
.mm-yellow.active { box-shadow: 0 0 30px rgba(251,255,72,0.5); }
.mm-purple.active { box-shadow: 0 0 30px rgba(168,85,247,0.5); }
.mm-orange.active { box-shadow: 0 0 30px rgba(255,159,28,0.5); }

/* Labels */
.mm-label     { font-weight: 800; text-transform: uppercase; color: #fff; font-size: 11px; letter-spacing: 0.5px; text-align: center; line-height: 1.1; }
.mm-hub .mm-label { font-size: 15px; }
.mm-sub-label { font-size: 7px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 1px; font-family: 'JetBrains Mono', monospace; }

/* Tooltip */
.mm-tooltip {
    position: absolute; bottom: calc(100% + 12px); left: 50%;
    transform: translateX(-50%) scale(0.8);
    background: rgba(0,0,0,0.9); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); color: #fff;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    padding: 8px 14px; border-radius: 8px; white-space: nowrap;
    pointer-events: none; opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    z-index: 50;
}
.mm-tooltip::after {
    content: ''; position: absolute; top: 100%; left: 50%;
    transform: translateX(-50%); border: 6px solid transparent; border-top-color: rgba(0,0,0,0.9);
}
.mm-bubble.active .mm-tooltip { opacity: 1; transform: translateX(-50%) scale(1); }

/* SVG connectors */
.mm-connector path { stroke: rgba(255,255,255,0.15); stroke-width: 2; fill: none; stroke-dasharray: 500; stroke-dashoffset: 500; transition: stroke 0.3s ease; }
.mm-connector.drawn path { animation: draw-line 1.5s ease forwards; }
.mm-connector.drawn .glow-path { stroke: rgba(59,130,246,0.2); stroke-width: 6; filter: blur(3px); animation: draw-line 1.5s ease forwards; }

/* Float classes */
.float-1 { animation: float-slow   5s ease-in-out infinite; }
.float-2 { animation: float-slow-2 4.5s ease-in-out infinite; }
.float-3 { animation: float-slow-3 6s ease-in-out infinite; }

/* Mobile */
@media (max-width: 767px) {
    .mind-map-container { min-height: auto; }
    .mm-mobile-grid { display: flex !important; flex-wrap: wrap; justify-content: center; gap: 16px; padding: 20px; }
    .mm-mobile-grid .mm-bubble { position: relative !important; top: auto !important; left: auto !important; }
    .mm-mobile-grid .mm-hub  { width: 95px; height: 95px; }
    .mm-mobile-grid .mm-node { width: 72px; height: 72px; }
    .mm-mobile-grid .mm-leaf { width: 60px; height: 60px; }
    .mm-connector-desktop { display: none !important; }
}
`;

const Skills = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const bubblesRef = useRef({});  // id -> DOM element
    const pathPairsRef = useRef([]); // [{main, glow, from, to}]

    // Inject CSS once
    useEffect(() => {
        const id = 'mm-styles';
        if (!document.getElementById(id)) {
            const style = document.createElement('style');
            style.id = id;
            style.textContent = MIND_MAP_CSS;
            document.head.appendChild(style);
        }
    }, []);

    /* -- SVG cubic bezier path (exact copy from index.html) -- */
    const makePath = useCallback((a, b) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const cx1 = a.x + dx * 0.35;
        const cy1 = a.y + dy * 0.1;
        const cx2 = a.x + dx * 0.65;
        const cy2 = b.y - dy * 0.1;
        return `M ${a.x},${a.y} C ${cx1},${cy1} ${cx2},${cy2} ${b.x},${b.y}`;
    }, []);

    /* -- Get bubble center in SVG viewBox coords (0-1000, 0-550) -- */
    const bubbleCenter = useCallback((el) => {
        const c = containerRef.current;
        if (!c || !el) return { x: 0, y: 0 };
        const cw = c.offsetWidth;
        const ch = c.offsetHeight;
        const cx = (el.offsetLeft + el.offsetWidth / 2) / cw * 1000;
        const cy = (el.offsetTop + el.offsetHeight / 2) / ch * 550;
        return { x: cx, y: cy };
    }, []);

    /* -- Update all connector paths -- */
    const updateConnectors = useCallback(() => {
        pathPairsRef.current.forEach(({ main, glow, from, to }) => {
            const aEl = bubblesRef.current[from];
            const bEl = bubblesRef.current[to];
            if (!aEl || !bEl) return;
            const a = bubbleCenter(aEl);
            const b = bubbleCenter(bEl);
            const d = makePath(a, b);
            main.setAttribute('d', d);
            glow.setAttribute('d', d);
        });
    }, [bubbleCenter, makePath]);

    /* -- Create SVG paths & setup drag (exact JS from index.html) -- */
    useEffect(() => {
        const svg = svgRef.current;
        const container = containerRef.current;
        if (!svg || !container) return;

        const svgNS = 'http://www.w3.org/2000/svg';

        // Create path elements
        const pairs = [];
        CONNECTIONS.forEach(({ from, to, dashed }) => {
            const glow = document.createElementNS(svgNS, 'path');
            glow.classList.add('glow-path');
            svg.appendChild(glow);

            const main = document.createElementNS(svgNS, 'path');
            if (dashed) {
                main.style.strokeDasharray = '8,8';
                main.style.stroke = 'rgba(255,255,255,0.08)';
            }
            svg.appendChild(main);
            pairs.push({ main, glow, from, to });
        });
        pathPairsRef.current = pairs;

        // Initial render
        updateConnectors();

        // Draw-in animation via IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    svg.classList.add('drawn');
                }
            });
        }, { threshold: 0.2 });
        observer.observe(container);

        // Click to activate/show tooltip
        const allBubbles = container.querySelectorAll('.mm-bubble');
        const handleClick = function (e) {
            if (this.classList.contains('dragging')) return;
            e.stopPropagation();
            const wasActive = this.classList.contains('active');
            allBubbles.forEach(b => b.classList.remove('active'));
            if (!wasActive) this.classList.add('active');
        };
        const handleDocClick = () => {
            allBubbles.forEach(b => b.classList.remove('active'));
        };
        allBubbles.forEach(b => b.addEventListener('click', handleClick));
        document.addEventListener('click', handleDocClick);

        // Drag logic (exact copy from index.html)
        const cleanups = [];
        allBubbles.forEach(bubble => {
            let isDragging = false;
            let hasDragged = false;
            let startX, startY, origLeft, origTop;

            const onMouseDown = function (e) {
                if (window.innerWidth < 768) return;
                isDragging = true;
                hasDragged = false;
                this.classList.add('dragging');
                startX = e.clientX;
                startY = e.clientY;
                origLeft = this.offsetLeft;
                origTop = this.offsetTop;
                e.preventDefault();
            };

            const onMouseMove = function (e) {
                if (!isDragging) return;
                hasDragged = true;
                bubble.style.left = (origLeft + e.clientX - startX) + 'px';
                bubble.style.top = (origTop + e.clientY - startY) + 'px';
                updateConnectors();
            };

            const onMouseUp = function () {
                if (!isDragging) return;
                isDragging = false;
                bubble.classList.remove('dragging');
                if (hasDragged) setTimeout(() => { hasDragged = false; }, 50);
            };

            // Touch support
            const onTouchStart = function (e) {
                isDragging = true;
                hasDragged = false;
                this.classList.add('dragging');
                const t = e.touches[0];
                startX = t.clientX;
                startY = t.clientY;
                origLeft = this.offsetLeft;
                origTop = this.offsetTop;
            };

            const onTouchMove = function (e) {
                if (!isDragging) return;
                hasDragged = true;
                const t = e.touches[0];
                this.style.left = (origLeft + t.clientX - startX) + 'px';
                this.style.top = (origTop + t.clientY - startY) + 'px';
                updateConnectors();
            };

            const onTouchEnd = function () {
                if (!isDragging) return;
                isDragging = false;
                this.classList.remove('dragging');
            };

            bubble.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            bubble.addEventListener('touchstart', onTouchStart, { passive: true });
            bubble.addEventListener('touchmove', onTouchMove, { passive: true });
            bubble.addEventListener('touchend', onTouchEnd);

            cleanups.push(() => {
                bubble.removeEventListener('mousedown', onMouseDown);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                bubble.removeEventListener('touchstart', onTouchStart);
                bubble.removeEventListener('touchmove', onTouchMove);
                bubble.removeEventListener('touchend', onTouchEnd);
            });
        });

        // Cleanup
        return () => {
            observer.disconnect();
            allBubbles.forEach(b => b.removeEventListener('click', handleClick));
            document.removeEventListener('click', handleDocClick);
            cleanups.forEach(fn => fn());
            // Remove SVG paths
            pairs.forEach(({ main, glow }) => {
                main.remove();
                glow.remove();
            });
        };
    }, [updateConnectors]);

    /* -- Resize handler -- */
    useEffect(() => {
        const handler = () => updateConnectors();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [updateConnectors]);

    return (
        <section id="skills" className="py-20 bg-neo-black text-neo-white border-y-4 border-black relative overflow-hidden">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1400px] mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-4 border-white pb-4">
                    <ScrollReveal>
                        <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
                            SKILL<span className="text-neo-green">_MAP</span>
                        </h2>
                    </ScrollReveal>
                    <div className="flex items-center gap-2 mb-2 md:mb-4">
                        <div className="w-3 h-3 bg-neo-blue rounded-full animate-pulse" />
                        <p className="font-mono text-neo-green text-sm font-bold">/// NEURAL_NETWORK</p>
                    </div>
                </div>

                {/* Mind Map */}
                <div ref={containerRef} className="mind-map-container">
                    {/* SVG Connector Lines (Desktop only) */}
                    <svg ref={svgRef}
                        className="mm-connector mm-connector-desktop absolute inset-0 w-full h-full"
                        style={{ zIndex: 0 }}
                        preserveAspectRatio="none"
                        viewBox="0 0 1000 550"
                    />

                    {/* Bubbles */}
                    <div className="mm-mobile-grid">
                        {NODES.map(node => (
                            <div
                                key={node.id}
                                ref={el => { if (el) bubblesRef.current[node.id] = el; }}
                                className={`mm-bubble mm-${node.type} mm-${node.color} float-${node.float} cursor-hover`}
                                data-node={node.id}
                                style={{ left: `${node.x}%`, top: `${node.y}%`, transformOrigin: 'center' }}
                            >
                                <div className="mm-tooltip">{node.tip}</div>
                                <span className="mm-label">{node.label}</span>
                                <span className="mm-sub-label">{node.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t-4 border-white mt-8 pt-4 flex justify-between font-mono text-xs text-gray-500">
                    <span>NODES: 10 &nbsp;|&nbsp; CLUSTERS: 2</span>
                    <span className="text-neo-green/50">DRAG & CLICK NODES TO EXPLORE</span>
                </div>
            </div>
        </section>
    );
};

export default Skills;
