import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import ForecastPanel from './ForecastPanel';
import Toggle from './common/Toggle';
import { kpiCategories } from '../data/mockData';
import { ArrowUp, ArrowDown, Minus, TrendingUp, Home, Wallet, Layers } from 'lucide-react';

const TrendIcon = ({ trend, intent, size = 24 }) => {
    let color = 'var(--color-text-muted)';
    if (intent === 'positive') color = 'var(--color-text-accent)'; // Use theme accent
    if (intent === 'negative') color = '#f87171'; // Keep red for now, or add var
    // Neutral stays muted

    if (trend === 'up') return <ArrowUp size={size} color={color} strokeWidth={3} />;
    if (trend === 'down') return <ArrowDown size={size} color={color} strokeWidth={3} />;
    return <Minus size={size} color={color} strokeWidth={3} />;
};

const RowSection = ({ categoryKey }) => {
    const navigate = useNavigate();
    const category = kpiCategories[categoryKey];

    // Split description for "Headline" vs "Body" styling
    const [headline, ...bodyParts] = category.description.split('\n');
    const bodyText = bodyParts.join(' ');

    const getIcon = (key) => {
        if (key === 'demand') return <TrendingUp size={18} color="var(--color-text-primary)" />;
        if (key === 'supply') return <Home size={18} color="var(--color-text-primary)" />;
        if (key === 'prices') return <Wallet size={18} color="var(--color-text-primary)" />;
        return <Layers size={18} color="var(--color-text-primary)" />;
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '160px 1.4fr 1fr 1fr 1fr',
            gap: '0.75rem', // Ultra Compact Gap
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            padding: '0.35rem 0', // Ultra Compact Padding
            position: 'relative',
            flex: 1,
            minHeight: 0
        }}>
            {/* Title Box - Clean Text with Icon */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '0.5rem',
                    height: '100%',
                    paddingLeft: '0',
                    borderRight: '1px solid var(--color-border)',
                }}
            >
                <div style={{
                    padding: '8px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 78, 67, 0.4))',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {getIcon(categoryKey)}
                </div>
                <h3 className="font-display" style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                    opacity: 1
                }}>
                    {category.title}
                </h3>
            </div>

            {/* Description Text - Rich Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0.5rem', borderLeft: '1px solid transparent', height: '100%' }}>
                <span style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '2px',
                    lineHeight: 1.2
                }}>
                    {headline}
                </span>
                <span style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.3,
                    fontWeight: 400
                }}>
                    {bodyText}
                </span>
            </div>

            {/* Metrics x3 - Compact & Solid */}
            {category.metrics.map((metric, i) => {
                const isClickable = metric.id === 'rir_increase';
                return (
                    <div
                        key={metric.id}
                        onClick={() => isClickable && navigate('/affordability')}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '0.4rem',
                            height: '100%',
                            minHeight: '80px', // Reduced min-height
                            border: '1px solid rgba(255,255,255,0.05)',
                            cursor: isClickable ? 'pointer' : 'default',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(16, 185, 129, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ marginBottom: '0.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                            <TrendIcon trend={metric.trend} intent={metric.intent} size={24} />
                        </div>
                        <div className="font-display" style={{
                            fontSize: '1.35rem', // Slightly smaller to give text room
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                        }}>
                            {metric.value}
                        </div>
                        <div style={{
                            fontSize: '0.72rem', // Larger, readable size
                            color: 'rgba(255,255,255,0.9)', // High Contrast
                            textAlign: 'center',
                            marginTop: '0.25rem',
                            fontWeight: 500,
                            lineHeight: 1.3, // Better spacing
                            maxWidth: '100%'
                        }}>
                            {metric.subtext || metric.label}
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                        }} />
                    </div>
                );
            })}
        </div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { timeContext } = useOutletContext();
    const [baselineApplied, setBaselineApplied] = useState(false);

    // Adjusted: 100vh - 120px (Header + Padding) to maximise space
    return (
        <div className="animate-enter" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0 0.5rem 1rem 0.5rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '66% 1fr', gap: '1rem', height: '100%' }}>

                {/* Left Panel: Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', height: '100%' }}>

                    {/* Headers Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 1.4fr 1fr 1fr 1fr',
                        gap: '0.75rem',
                        paddingBottom: '0.2rem',
                        alignItems: 'end',
                        flexShrink: 0
                    }}>
                        <div></div>
                        <div></div>
                        <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                            <div style={{
                                background: 'linear-gradient(90deg, rgba(6, 78, 67, 0.6) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(6, 78, 67, 0.6) 100%)',
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                color: 'var(--color-text-accent)',
                                padding: '0.35rem 0',
                                width: '100%',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}>
                                Historic (Mid-Long Term)
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                background: 'linear-gradient(90deg, rgba(6, 78, 67, 0.6) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(6, 78, 67, 0.6) 100%)',
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                color: 'var(--color-text-accent)',
                                padding: '0.35rem 0',
                                width: '100%',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}>
                                Short Term (12m)
                            </div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                        <RowSection categoryKey="demand" />
                        <RowSection categoryKey="supply" />
                        <RowSection categoryKey="prices" />
                        <RowSection categoryKey="other" />
                    </div>

                    {/* Footer: Policy Monitoring HERO BADGE - ULTRA COMPACT & WIDE */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '0.25rem',
                        flexShrink: 0,
                        paddingTop: '0.25rem',
                        width: '100%' // Ensure container is full width
                    }}>
                        <div style={{
                            background: 'linear-gradient(90deg, rgba(6, 78, 67, 0.8) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(6, 78, 67, 0.8) 100%)', // Stronger gradient
                            border: '1px solid rgba(52, 211, 153, 0.4)',
                            borderRadius: 'var(--radius-full)',
                            padding: '0.6rem 0', // Taller, but padding handled by width
                            width: '100%', // Full Width
                            textAlign: 'center',
                            color: 'var(--color-text-accent)',
                            fontSize: '0.85rem', // Slightly larger
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            boxShadow: '0 0 25px rgba(16, 185, 129, 0.2), inset 0 0 15px rgba(16, 185, 129, 0.05)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.2), inset 0 0 15px rgba(16, 185, 129, 0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Layers size={18} /> POLICY MONITORING
                        </div>
                    </div>
                </div>

                {/* Right Panel: Forecast */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5rem', paddingTop: '0' }}>
                    <div className="glass-card" style={{
                        flex: 1,
                        borderRadius: 'var(--radius-xl)',
                        padding: '1rem', // Compact Padding
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border-highlight)',
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))'
                    }}>
                        <div style={{
                            background: 'var(--gradient-primary)',
                            padding: '0.4rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-bg-deep)',
                            fontWeight: 700,
                            textAlign: 'center',
                            boxShadow: 'var(--shadow-md)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.05em',
                            flexShrink: 0
                        }}>
                            FORECAST
                        </div>

                        {/* Controls */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.75rem',
                            marginTop: '0.75rem',
                            flexShrink: 0,
                            background: 'rgba(0,0,0,0.2)',
                            padding: '0.25rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {/* Baseline Tab */}
                            <div
                                style={{
                                    padding: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: !baselineApplied ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                    textAlign: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    opacity: !baselineApplied ? 1 : 0.6,
                                    fontWeight: !baselineApplied ? 700 : 500,
                                    cursor: 'pointer',
                                    border: !baselineApplied ? '1px solid var(--color-primary)' : '1px solid transparent',
                                    background: !baselineApplied ? 'var(--color-border)' : 'transparent',
                                    boxShadow: !baselineApplied ? 'var(--shadow-glow)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setBaselineApplied(false)}
                            >
                                Baseline <span style={{ fontWeight: 400, fontSize: '0.65rem', opacity: 0.8, display: 'block', marginTop: '1px' }}>(Committed)</span>
                            </div>

                            {/* Policy Tab */}
                            <div
                                style={{
                                    padding: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: baselineApplied ? 'var(--color-text-gold)' : 'var(--color-text-secondary)',
                                    textAlign: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: baselineApplied ? 700 : 500,
                                    cursor: 'pointer',
                                    border: baselineApplied ? '1px solid var(--color-text-gold)' : '1px solid transparent',
                                    background: baselineApplied ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                                    boxShadow: baselineApplied ? '0 0 10px rgba(251, 191, 36, 0.2)' : 'none',
                                    transition: 'all 0.3s ease',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}
                                onClick={() => setBaselineApplied(true)}
                            >
                                <div>
                                    Policy Impacts
                                </div>
                            </div>
                        </div>

                        {/* Forecast Content */}
                        <div style={{ flex: 1, position: 'relative', marginTop: '0.5rem', minHeight: '0' }}>
                            <ForecastPanel baselineApplied={baselineApplied} />
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexShrink: 0 }}>
                            <button className="glass" style={{ flex: 1, fontSize: '0.7rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}>
                                Baseline Assumptions
                            </button>
                            <button onClick={() => navigate('/policies')} className="glass" style={{ flex: 1, fontSize: '0.7rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}>
                                Policy Breakdown
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
