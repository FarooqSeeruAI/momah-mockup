import React from 'react';
import { motion } from 'framer-motion';
import TrendIndicator from '../common/TrendIndicator';

const MetricCard = ({
    label,
    value,
    trend,
    intent,
    subtext,
    delay = 0,
    onClick
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass-card"
            onClick={onClick}
            style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                cursor: onClick ? 'pointer' : 'default',
                minHeight: '140px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="font-display" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    opacity: 0.9
                }}>
                    {label}
                </h3>
                {trend && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        padding: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TrendIndicator trend={trend} intent={intent} size={18} />
                    </div>
                )}
            </div>

            <div>
                <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                    marginBottom: '0.25rem'
                }}>
                    {value}
                </div>

                {subtext && (
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        {subtext}
                    </div>
                )}
            </div>

            {/* Hover reveal hint - CSS handles the lift, but we can add a visual cue if needed */}
        </motion.div>
    );
};

export default MetricCard;
