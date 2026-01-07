import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import ForecastPanel from './ForecastPanel';
import Toggle from './common/Toggle';
import { kpiCategories } from '../data/mockData';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

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

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '180px 1.5fr 1fr 1fr 1fr',
            gap: '1rem', // Reduced gap
            alignItems: 'center',
            borderBottom: '1px solid var(--color-border)',
            padding: '0.75rem 0', // Reduced padding significantly
            position: 'relative',
            flex: 1, // Allow row to flex
            minHeight: 0 // Allow shrinking
        }}>
            {/* Title Box - Compact */}
            <div
                className="glass"
                style={{
                    background: 'var(--color-bg-card)', // Use theme card bg
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '0.5rem 1rem',
                    textAlign: 'center',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 0.2s',
                    // Removed cursor pointer
                }}
            >
                <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '0.02em' }}>
                    {category.title}
                </h3>
            </div>

            {/* Description Text - Compact Typography */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.75rem', borderLeft: '1px solid var(--color-border)', height: '80%' }}>
                <p style={{
                    fontSize: '0.85rem', // Slightly smaller
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.4,
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {category.description}
                </p>
            </div>

            {/* Metrics x3 - Compact */}
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
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.5rem', // Tighter padding
                            height: '100%',
                            border: '1px solid rgba(255,255,255,0.03)',
                            cursor: isClickable ? 'pointer' : 'default',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (isClickable) {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isClickable) {
                                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                            }
                        }}
                    >
                        <div style={{ marginBottom: '0.25rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                            <TrendIcon trend={metric.trend} intent={metric.intent} size={24} /> {/* Smaller icon */}
                        </div>
                        <div className="font-display" style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            lineHeight: 1,
                            // Removed hardcoded gradient text to support all themes
                        }}>
                            {metric.value}
                        </div>
                        <div style={{
                            fontSize: '0.65rem', // Smaller subtext
                            color: 'var(--color-text-muted)',
                            textAlign: 'center',
                            marginTop: '0.25rem',
                            lineHeight: 1.2,
                            maxWidth: '95%'
                        }}>
                            {metric.subtext || metric.label}
                        </div>
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

    // Adjusted calculation: 100vh - Header(~80px) - MainPadding(~64px to 100px)
    // Let's rely on flexbox within the main outlet if possible, or set a strict limit.
    // Setting calc(100vh - 170px) to be safe.

    return (
        <div className="animate-enter" style={{ height: 'calc(100vh - 170px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '68% 30%', gap: '1.5rem', height: '100%' }}>

                {/* Left Panel: Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', height: '100%' }}>

                    {/* Headers Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '180px 1.5fr 1fr 1fr 1fr',
                        gap: '1rem',
                        paddingBottom: '0.5rem',
                        // Removed bottom border to make headers look like floating buttons/pills
                        alignItems: 'end',
                        flexShrink: 0
                    }}>
                        <div></div>
                        <div></div>
                        <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(6, 78, 67, 1) 0%, rgba(2, 44, 38, 1) 100%)', // Harder background
                                border: '1px solid var(--color-primary)',
                                color: '#fff',
                                padding: '0.5rem 0',
                                width: '100%',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                boxShadow: 'var(--shadow-md)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Historic (Medium to Long Term)
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(6, 78, 67, 1) 0%, rgba(2, 44, 38, 1) 100%)', // Match style
                                border: '1px solid var(--color-primary)',
                                color: '#fff',
                                padding: '0.5rem 0',
                                width: '100%',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                boxShadow: 'var(--shadow-md)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                Short Term (12m)
                            </div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                        {/* Using flex:1 and minHeight:0 is crucial for nested flex scrolling/sizing */}
                        <RowSection categoryKey="demand" />
                        <RowSection categoryKey="supply" />
                        <RowSection categoryKey="prices" />
                        <RowSection categoryKey="other" />
                    </div>

                    {/* Footer: Policy Monitoring */}
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(6, 78, 67, 1) 0%, rgba(2, 44, 38, 1) 100%)',
                        border: '1px solid var(--color-primary)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.5rem',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginTop: '0.5rem',
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        Policy Monitoring
                    </div>
                </div>

                {/* Right Panel: Forecast */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', paddingTop: '0' }}>
                    <div className="glass-card" style={{
                        flex: 1,
                        borderRadius: 'var(--radius-xl)',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border)',
                        overflow: 'hidden' // Ensure chart doesn't push out
                    }}>
                        <div style={{
                            background: 'var(--gradient-primary)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-bg-deep)',
                            fontWeight: 700,
                            textAlign: 'center',
                            boxShadow: 'var(--shadow-md)',
                            fontSize: '1rem',
                            letterSpacing: '0.05em',
                            flexShrink: 0
                        }}>
                            FORECAST
                        </div>

                        {/* Controls - Redesigned as Tab-like Toggles with Border Highlight */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.75rem',
                            marginTop: '1.5rem',
                            flexShrink: 0,
                            background: 'rgba(0,0,0,0.2)',
                            padding: '0.25rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {/* Baseline Tab */}
                            <div
                                style={{
                                    padding: '0.6rem',
                                    fontSize: '0.75rem',
                                    color: !baselineApplied ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                    textAlign: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    opacity: !baselineApplied ? 1 : 0.6,
                                    fontWeight: !baselineApplied ? 600 : 400,
                                    cursor: 'pointer',
                                    border: !baselineApplied ? '1px solid var(--color-primary)' : '1px solid transparent',
                                    background: !baselineApplied ? 'var(--color-border)' : 'transparent',
                                    boxShadow: !baselineApplied ? 'var(--shadow-glow)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setBaselineApplied(false)}
                            >
                                Baseline <span style={{ fontWeight: 400, fontSize: '0.65rem', opacity: 0.8, display: 'block', marginTop: '2px' }}>(Committed Policies)</span>
                            </div>

                            {/* Policy Tab */}
                            <div
                                style={{
                                    padding: '0.6rem',
                                    fontSize: '0.75rem',
                                    color: baselineApplied ? 'var(--color-text-gold)' : 'var(--color-text-secondary)',
                                    textAlign: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: baselineApplied ? 600 : 400,
                                    cursor: 'pointer',
                                    border: baselineApplied ? '1px solid var(--color-text-gold)' : '1px solid transparent',
                                    background: baselineApplied ? 'rgba(251, 191, 36, 0.1)' : 'transparent', // Can replace with var if needed, but gold is specific
                                    boxShadow: baselineApplied ? '0 0 10px rgba(251, 191, 36, 0.2)' : 'none',
                                    transition: 'all 0.3s ease',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}
                                onClick={() => setBaselineApplied(true)}
                            >
                                <div>
                                    Policy Impacts Applied
                                </div>
                            </div>
                        </div>

                        {/* Forecast Content */}
                        <div style={{ flex: 1, position: 'relative', marginTop: '1rem', minHeight: '0' }}>
                            <ForecastPanel baselineApplied={baselineApplied} />
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexShrink: 0 }}>
                            <button className="glass" style={{ flex: 1, fontSize: '0.7rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>Baseline Assumptions</button>
                            <button className="glass" style={{ flex: 1, fontSize: '0.7rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>Policy Breakdown</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
