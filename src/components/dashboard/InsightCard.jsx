import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const InsightCard = ({ title, text, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass"
            style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
                borderLeft: '4px solid var(--color-text-accent)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                    background: 'rgba(52, 211, 153, 0.15)',
                    padding: '6px',
                    borderRadius: '50%',
                    color: 'var(--color-text-accent)'
                }}>
                    <Lightbulb size={18} />
                </div>
                <h3 className="font-display" style={{
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em'
                }}>
                    {title}
                </h3>
            </div>

            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6
            }}>
                {text}
            </p>

            {/* Decorative background glow */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(52, 211, 153, 0.15), transparent 70%)',
                zIndex: -1
            }} />
        </motion.div>
    );
};

export default InsightCard;
