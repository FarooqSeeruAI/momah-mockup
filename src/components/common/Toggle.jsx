import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ checked, onChange, label }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => onChange(!checked)}>
            <div style={{
                width: '44px',
                height: '24px',
                background: checked ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'background 0.3s'
            }}>
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    style={{
                        width: '20px',
                        height: '20px',
                        background: '#fff',
                        borderRadius: '50%',
                        x: checked ? 20 : 0
                    }}
                />
            </div>
            {label && <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{label}</span>}
        </div>
    );
};

export default Toggle;
