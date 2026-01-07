import React, { useState } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Toggle } from './UIComponents';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PriceScenarios = () => {
    const [activeScenario, setActiveScenario] = useState('Scenario 2');

    const data = [
        { year: '2021', base: 4000, s1: 4000, s2: 4000 },
        { year: '2022', base: 4100, s1: 4100, s2: 4300 },
        { year: '2023', base: 4200, s1: 4400, s2: 4600 },
        { year: '2024', base: 4250, s1: 4800, s2: 5100 },
        { year: '2025', base: 4300, s1: 5200, s2: 5500 },
        { year: '2026', base: 4350, s1: 5100, s2: 5300 }, // Correction
        { year: '2027', base: 4400, s1: 4900, s2: 5100 }, // Supply kicks in
        { year: '2028', base: 4450, s1: 4800, s2: 5000 },
        { year: '2029', base: 4500, s1: 4750, s2: 4950 },
        { year: '2030', base: 4550, s1: 4700, s2: 4900 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, fontSize: '0.9rem', fontWeight: 600 }}>
                            {entry.name}: {entry.value.toLocaleString()} SAR/m²
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="animate-enter" style={{ height: 'calc(100vh - 140px)', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
            {/* Sidebar Controls */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Price Projections</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Foreign ownership impact on price per square meter (SAR/m²) in Riyadh.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                    {['Base Case', 'Scenario 1', 'Scenario 2', 'Scenario 3'].map(sc => (
                        <button
                            key={sc}
                            onClick={() => setActiveScenario(sc)}
                            className="glass"
                            style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                textAlign: 'left',
                                background: activeScenario === sc ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                                borderColor: activeScenario === sc ? '#34d399' : 'transparent',
                                color: activeScenario === sc ? '#34d399' : '#94a3b8',
                                fontWeight: activeScenario === sc ? 600 : 400,
                                transition: 'all 0.3s'
                            }}
                        >
                            {sc}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Insight</div>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '1rem' }}>
                        Scenario 2 shows a <span style={{ color: '#fbbf24' }}>step-jump</span> in prices during 2024-2025 due to speculative inflows, followed by stabilization as supply responds.
                    </p>
                    <Link to="/foreign-ownership/map" style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none'
                    }}>
                        Deep-dive: Geospatial Analysis <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 className="font-display" style={{ fontSize: '1.25rem' }}>Average Price Trends (Riyadh)</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }}></span> Baseline</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }}></span> Scenario Impact</div>
                    </div>
                </div>

                <div style={{ flex: 1, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[3500, 6000]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="base" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Baseline" />
                            <Line
                                type="monotone"
                                dataKey={activeScenario === 'Scenario 1' ? 's1' : 's2'}
                                stroke="#34d399"
                                strokeWidth={4}
                                dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}
                                activeDot={{ r: 8 }}
                                name="Selected Scenario"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PriceScenarios;
