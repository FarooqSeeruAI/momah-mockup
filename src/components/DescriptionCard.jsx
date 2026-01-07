import React from 'react';

const DescriptionCard = ({ title, text, delay = 0 }) => {
    return (
        <div className='glass-card animate-enter' style={{
            padding: '1.5rem',
            borderRadius: '16px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            animationDelay: `${delay}s`
        }}>
            <h4 className="font-display" style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: '#e2e8f0', // Lighter slate
                lineHeight: 1.3
            }}>
                {title}
            </h4>
            <p style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                fontWeight: 300
            }}>
                {text}
            </p>
        </div>
    );
};

export default DescriptionCard;
