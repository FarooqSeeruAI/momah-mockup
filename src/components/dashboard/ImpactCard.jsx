import React from 'react';
import { motion } from 'framer-motion';

const ImpactCard = ({ title, value, intent, label, delay = 0, onClick }) => {
    const getColor = () => {
        switch (intent) {
            case 'positive': return '#10b981'; // Emerald
            case 'negative': return '#ef4444'; // Red
            case 'neutral': return '#64748b';  // Slate
            default: return '#10b981';
        }
    };

    const bgStyle = () => {
        // Subtle tinted background based on intent
        if (intent === 'positive') return 'rgba(16, 185, 129, 0.05)';
        if (intent === 'negative') return 'rgba(239, 68, 68, 0.05)';
        return 'rgba(255, 255, 255, 0.03)';
    };

    const borderStyle = () => {
        if (intent === 'positive') return 'rgba(16, 185, 129, 0.2)';
        if (intent === 'negative') return 'rgba(239, 68, 68, 0.2)';
        return 'var(--color-border)';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay }}
            className="glass-card"
            onClick={onClick}
            style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: bgStyle(),
                borderColor: borderStyle(),
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.5rem',
                minHeight: '120px'
            }}
        >
            <span style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                fontWeight: 500
            }}>
                {title}
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: getColor()
                }}>
                    {value}
                </span>
                {label && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</span>}
            </div>

            {/* Visual Pill for Intent */}
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'left bottom', marginTop: 'auto' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: intent === 'positive' ? 'rgba(16, 185, 129, 0.2)' : intent === 'negative' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                    color: getColor(),
                    fontSize: '0.7rem',
                    fontWeight: 600
                }}>
                    {intent === 'positive' ? 'POSITIVE IMPACT' : intent === 'negative' ? 'NEGATIVE IMPACT' : 'NEUTRAL'}
                </div>
            </div>

        </motion.div>
    );
};

export default ImpactCard;
