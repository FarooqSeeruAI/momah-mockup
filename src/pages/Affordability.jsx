import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { affordabilityData } from '../data/mockData';

const Affordability = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-enter" style={{
            height: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '0 0.5rem 1rem 0.5rem' // Consistent padding with Dashboard
        }}>
            {/* Header - Compact */}
            <div style={{ marginBottom: '1rem', flexShrink: 0 }}>
                <button
                    onClick={() => navigate('/')} // Back to home
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.85rem' }}
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Affordability Deep-Dive
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        Detailed analysis of Price-to-Income and Rent-to-Income ratios for Riyadh.
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', flex: 1, minHeight: 0 }}>

                {/* Charts Area - Flex Column to Share Space */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', minHeight: 0 }}>

                    {/* Chart 1: PIR */}
                    <div className="glass-card" style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-xl)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0 // Allow shrinking
                    }}>
                        <div style={{ marginBottom: '0.5rem', flexShrink: 0 }}>
                            <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 600 }}>Price-to-Income Ratio (PIR)</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Multiples of Annual Income to Purchase Standard Unit</p>
                        </div>
                        <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={affordabilityData.pir.filter(d => d.year <= 2025)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} dy={5} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} domain={[4, 9]} />
                                    <Tooltip contentStyle={{ background: 'var(--color-bg-deep)', borderColor: 'var(--color-border)', fontSize: '12px' }} />
                                    <ReferenceLine y={5} stroke="#34d399" strokeDasharray="3 3" label={{ position: 'right', value: 'Target', fill: "#34d399", fontSize: 10 }} />
                                    <Line type="monotone" dataKey="val" stroke="var(--color-text-accent)" strokeWidth={3} dot={{ fill: 'var(--color-bg-deep)', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart 2: RIR */}
                    <div className="glass-card" style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-xl)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0 // Allow shrinking
                    }}>
                        <div style={{ marginBottom: '0.5rem', flexShrink: 0 }}>
                            <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 600 }}>Rent-to-Income Ratio (RIR)</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Percentage of Monthly Income spent on Rent</p>
                        </div>
                        <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={affordabilityData.rir.filter(d => d.year <= 2025)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} dy={5} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} domain={[15, 45]} unit="%" />
                                    <Tooltip contentStyle={{ background: 'var(--color-bg-deep)', borderColor: 'var(--color-border)', fontSize: '12px' }} />
                                    <ReferenceLine y={30} stroke="#fbbf24" strokeDasharray="3 3" label={{ position: 'right', value: 'Stress Line', fill: "#fbbf24", fontSize: 10 }} />
                                    <Line type="monotone" dataKey="val" stroke="#f472b6" strokeWidth={3} dot={{ fill: 'var(--color-bg-deep)', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* Insights Side Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexShrink: 0 }}>
                            <AlertCircle color="var(--color-text-gold)" size={20} />
                            <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1.1rem' }}>Key Insights</h3>
                        </div>

                        <ul style={{
                            display: 'flex', flexDirection: 'column', gap: '1rem',
                            listStyle: 'none', padding: 0,
                            overflowY: 'auto'
                        }}>
                            <li style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>Widening Gap</strong>
                                Wage growth (+3% YoY) is lagging significantly behind rental inflation (+15% YoY), creating acute pressure on the mid-market segment.
                            </li>
                            <li style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>RIR Stress</strong>
                                Households in North Riyadh are now spending &gt;40% of income on rent, breaching the sustainable 30% threshold.
                            </li>
                            <li style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.2rem' }}>Sales Market</strong>
                                PIR remains high (6.8x) but has stabilized due to strict mortgage caps. Transaction volumes have shifted to the &lt; 1.5M SAR bracket.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Affordability;
