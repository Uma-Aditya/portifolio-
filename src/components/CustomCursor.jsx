import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                e.target.closest('a') || e.target.closest('button') ||
                e.target.classList.contains('cursor-hover')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block" // Hidden on mobile
            animate={{
                x: mousePosition.x - (isHovering ? 18 : 12),
                y: mousePosition.y - (isHovering ? 18 : 12),
                width: isHovering ? 36 : 24,
                height: isHovering ? 36 : 24,
                backgroundColor: isHovering ? 'var(--neo-yellow)' : 'var(--neo-white)',
                mixBlendMode: isHovering ? 'normal' : 'difference',
                border: isHovering ? '2px solid #000' : 'none'
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            style={{
                borderRadius: '50%'
            }}
        />
    );
};

export default CustomCursor;
