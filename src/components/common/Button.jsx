import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyles = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '0.95rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: '1px solid transparent',
    };

    const variants = {
        primary: {
            background: 'var(--gradient-primary)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
        },
        glass: {
            background: 'var(--color-bg-glass)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-secondary)',
        }
    };

    const activeStyle = variants[variant] || variants.primary;

    return (
        <button
            onClick={onClick}
            className={className}
            style={{ ...baseStyles, ...activeStyle }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
