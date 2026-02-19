import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Magnetic from './Magnetic';

const Hero = () => {
    // Tic-Tac-Toe Logic
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const result = calculateWinner(board);
    const winner = result?.winner;
    const winLine = result?.line || [];

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative overflow-hidden border-b-4 border-black dark:border-gray-600 bg-neo-white dark:bg-[#0d0d0d]">
            {/* Floating Shapes */}
            <div className="absolute top-1/3 left-[10%] w-16 h-16 bg-neo-blue border-4 border-black shadow-hard hidden lg:block float-1 dark:border-gray-500"></div>
            <div className="absolute bottom-1/3 right-[10%] w-24 h-24 bg-neo-pink rounded-full border-4 border-black shadow-hard hidden lg:block float-2 dark:border-gray-500"></div>
            <div className="absolute top-20 right-20 text-9xl opacity-5 font-black select-none pointer-events-none text-black dark:text-white">CODE</div>

            {/* Tic-Tac-Toe Mini Game */}
            <motion.div
                initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -12, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-24 left-[3%] hidden lg:block"
            >
                <div className="bg-white dark:bg-[#1a1a1a] border-3 border-black dark:border-gray-500 shadow-hard p-3 w-[170px]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-[9px] uppercase font-mono dark:text-white">TIC-TAC-TOE</span>
                        <button onClick={resetGame} className="text-[8px] font-mono font-bold bg-neo-green border-2 border-black px-1.5 py-0.5 hover:bg-black hover:text-white transition-all cursor-hover">RESET</button>
                    </div>
                    <div className="grid grid-cols-3 gap-0 border-2 border-black dark:border-gray-500">
                        {board.map((cell, i) => (
                            <div
                                key={i}
                                onClick={() => handleClick(i)}
                                className={`w-[44px] h-[44px] flex items-center justify-center font-black text-lg cursor-hover transition-all duration-300
                                    ${i % 3 !== 2 ? 'border-r-2 border-black dark:border-gray-500' : ''} 
                                    ${i < 6 ? 'border-b-2 border-black dark:border-gray-500' : ''}
                                    ${winLine.includes(i) ? 'scale-110' : ''}
                                    ${winLine.includes(i) ? 'text-black' : cell === 'X' ? 'bg-neo-yellow text-black' : cell === 'O' ? 'bg-neo-blue text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                                `}
                                style={winLine.includes(i) ? { background: '#33FF57' } : {}}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                    <div className="text-center font-mono text-[8px] font-bold mt-1.5 uppercase tracking-wider dark:text-white">
                        {winner ? `WINNER: ${winner}` : `TURN: ${isXNext ? 'X' : 'O'}`}
                    </div>
                </div>
                <p className="text-center font-mono text-[10px] mt-2 tracking-widest uppercase animate-pulse font-bold text-black dark:text-neo-yellow">
                    ▶ TAP TO PLAY
                </p>
            </motion.div>

            <div className="relative z-10 text-center max-w-5xl">
                <ScrollReveal direction="up">
                    <div className="inline-block bg-neo-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-500 px-4 py-1 mb-6 shadow-hard rotate-[-2deg]">
                        <span className="font-mono font-bold text-neo-green bg-black px-2 mr-2">●</span>
                        <span className="font-mono font-bold dark:text-white">SYSTEM STATUS: ONLINE</span>
                    </div>
                </ScrollReveal>

                    <h1 className="text-[13vw] md:text-[10vw] leading-[0.8] font-black uppercase tracking-tighter mb-6 dark:text-white">
                    <ScrollReveal delay={0.2}>FULL STACK</ScrollReveal>
                    <ScrollReveal delay={0.4}>
                        <span className="text-stroke-black">DEVELOPER</span>
                    </ScrollReveal>
                </h1>

                <ScrollReveal delay={0.6} direction="scale">
                    <p className="font-mono text-lg md:text-2xl max-w-2xl mx-auto mb-10 bg-neo-yellow border-2 border-black dark:border-gray-500 p-4 shadow-hard rotate-1 text-black">
                        I build responsive web experiences with clean code. <br />
                        <b>React • JavaScript • HTML • CSS • Java</b>
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.8} className="flex flex-col md:flex-row justify-center gap-6">
                    <Magnetic>
                        <a href="#projects" className="inline-block bg-black text-white border-2 border-black px-10 py-5 text-xl font-bold shadow-hard hover:bg-neo-green hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-hover">
                            VIEW DATABASE
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="/Assets/Resume/resume.pdf" download className="inline-block bg-neo-white dark:bg-[#1a1a1a] text-black dark:text-white border-2 border-black dark:border-gray-500 px-10 py-5 text-xl font-bold shadow-hard hover:bg-neo-pink hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-hover gap-2">
                            DOWNLOAD CV
                        </a>
                    </Magnetic>
                </ScrollReveal>
            </div>
        </section>
    );
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return null;
}

export default Hero;
