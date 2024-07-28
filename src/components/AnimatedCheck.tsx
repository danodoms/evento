import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCheckIconProps {
    onAnimationComplete: () => void;
}

export const AnimatedCheckIcon: React.FC<AnimatedCheckIconProps> = ({ onAnimationComplete }) => {
    const pathVariants = {
        hidden: { pathLength: 0 },
        visible: { pathLength: 1 },
    };

    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check"
            width="50"
            height="50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            onAnimationComplete={onAnimationComplete}
        >
            <motion.path
                d="M20 6L9 17l-5-5"
                variants={pathVariants}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
        </motion.svg>
    );
};