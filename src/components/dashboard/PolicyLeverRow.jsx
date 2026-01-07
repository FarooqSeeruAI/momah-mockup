import React, { useState } from 'react';
import { ChevronRight, Settings, Info, AlertCircle } from 'lucide-react';
import Toggle from '../common/Toggle';
import { motion } from 'framer-motion';

const ImpactPill = ({ level, type }) => {
    // level: 'high', 'medium', 'low', 'neutral'
    // type: 'positive', 'negative'

    // Parse level string e.g., "high_positive"
    let intensity = level;
    let sentiment = 'neutral';

    if (level.includes('_')) {
        [intensity, sentiment] = level.split('_');
    } else {
        intensity = level;
    }

    const getColor = () => {
        if (sentiment === 'positive') return '#34d399';
        if (sentiment === 'negative') return '#f87171'; // Red
        return '#94a3b8'; // Slate
    };

    const getOpacity = () => {
        switch (intensity) {
            case 'high': return 1;
            case 'medium': return 0.7;
            case 'low': return 0.4;
            default: return 0.2;
        }
    };

    if (intensity === 'neutral') {
        return <span style={{ color: '#64748b', fontSize: '0.85rem' }}>-</span>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{
                height: '8px',
                width: '32px',
                background: getColor(),
                borderRadius: '4px',
                opacity: getOpacity()
            }} />
            {/* <span style={{ fontSize: '0.75rem', color: getColor() }}>{intensity}</span> */}
        </div>
    );
};

const PolicyLeverRow = ({ lever, onDetailsClick, onImpactsClick }) => {
    const [isActive, setIsActive] = useState(lever.status === 'active');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 2fr) 1fr 1fr 1fr 1.5fr',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                gap: '1rem',
                marginBottom: '1rem',
                background: isActive ? 'var(--gradient-card)' : 'rgba(255,255,255,0.02)',
                border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                opacity: isActive ? 1 : 0.7
            }}
        >
            {/* Column 1: Control & Name */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Toggle checked={isActive} onChange={setIsActive} />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 className="font-display" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {lever.name}
                        </h4>
                        {lever.status === 'draft' && (
                            <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>DRAFT</span>
                        )}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                        {lever.description}
                    </p>

                    <button
                        onClick={onDetailsClick}
                        style={{
                            marginTop: '0.5rem',
                            display: 'flex', alignItems: 'center', gap: '0.25rem',
                            color: 'var(--color-text-accent)', fontSize: '0.75rem', fontWeight: 600
                        }}
                    >
                        <Settings size={12} />
                        Configure Assumptions
                    </button>
                </div>
            </div>

            {/* Impact Columns */}
            <div><ImpactPill level={lever.impacts.demand} /></div>
            <div><ImpactPill level={lever.impacts.supply} /></div>
            <div><ImpactPill level={lever.impacts.price} /></div>

            {/* Extended Impacts Link */}
            <div style={{ justifySelf: 'end' }}>
                <button
                    onClick={onImpactsClick}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        transition: 'all 0.2s'
                    }}
                    className="hover:bg-white/10"
                >
                    View Chain
                    <ChevronRight size={14} />
                </button>
            </div>

        </motion.div>
    );
};

export default PolicyLeverRow;
