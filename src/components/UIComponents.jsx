import React from 'react';

export const Toggle = ({ label, checked, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{label}</span>
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '44px',
                height: '24px',
                background: checked ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: checked ? '22px' : '2px',
                transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
        </div>
    </div>
);

export const Slider = ({ label, value, min, max, unit, onChange }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{label}</span>
            <span style={{ color: 'var(--color-text-accent)', fontWeight: 600 }}>{value}{unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                outline: 'none',
                appearance: 'none', // Standard reset, but we need CSS for track/thumb for full custom
                cursor: 'pointer'
            }}
            className="premium-slider"
        />
    </div>
);

export const Select = ({ label, value, options, onChange }) => (
    <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</label>
        <div className="glass" style={{ padding: '0.75rem', borderRadius: '8px', position: 'relative' }}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    outline: 'none',
                    appearance: 'none',
                    fontSize: '0.95rem'
                }}
            >
                {options.map(opt => <option key={opt} value={opt} style={{ color: 'black' }}>{opt}</option>)}
            </select>
            <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>▼</div>
        </div>
    </div>
);
