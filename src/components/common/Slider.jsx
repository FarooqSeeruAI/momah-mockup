import React from 'react';

const Slider = ({ value, onChange, min = 0, max = 100, label, formatValue }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div style={{ width: '100%', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{label}</label>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-accent)', fontWeight: 600 }}>
                    {formatValue ? formatValue(value) : value}
                </span>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${percentage}%`,
                        background: 'var(--gradient-primary)',
                        borderRadius: '3px'
                    }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'grab',
                        top: 0,
                        left: 0,
                        margin: 0
                    }}
                />
                <div style={{
                    position: 'absolute',
                    left: `${percentage}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    pointerEvents: 'none'
                }} />
            </div>
        </div>
    );
};

export default Slider;
