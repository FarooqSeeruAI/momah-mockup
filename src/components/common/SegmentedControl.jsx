import React from 'react';
import { motion } from 'framer-motion';

const SegmentedControl = ({ options, value, onChange, name }) => {
    return (
        <div
            className="glass"
            style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                gap: '4px',
                position: 'relative',
                background: 'rgba(0, 0, 0, 0.2)'
            }}
        >
            {options.map((option) => {
                const isActive = value === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        style={{
                            position: 'relative',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            fontWeight: isActive ? 600 : 400,
                            fontSize: '0.85rem',
                            transition: 'color 0.2s',
                            zIndex: 1,
                        }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`segment-bg-${name}`}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'var(--gradient-primary)',
                                    borderRadius: 'var(--radius-full)',
                                    zIndex: -1,
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SegmentedControl;
