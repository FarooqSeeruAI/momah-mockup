import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Affordability = () => {
    const data = [
        { year: '2022-Q4', value: 9.5 },
        { year: '2023-Q4', value: 12.8 },
        { year: '2024-Q4', value: 12.7 },
        { year: '2025-Q4', value: 13.7 },
    ];

    const dataApt = [
        { year: '2022-Q4', value: 4.4 },
        { year: '2023-Q4', value: 5.0 },
        { year: '2024-Q4', value: 4.8 },
        { year: '2025-Q4', value: 4.8 },
    ];

    const renderChart = (title, chartData, color) => (
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="font-display" style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '1rem', height: '40px' }}>{title}</h3>
            <div style={{ flex: 1, minHeight: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                            contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? color : '#64748b'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div className="animate-enter" style={{ maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Affordability Analysis</h1>
                <p style={{ color: '#94a3b8' }}>Tracking Price-to-Income and Rent-to-Income ratios for Villas and Apartments.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {renderChart("Price to Income Ratio (Villa), Riyadh", data, '#0d9488')}
                    {renderChart("Price to Income Ratio (Apartment), Riyadh", dataApt, '#0d9488')}
                    {renderChart("Rent to Income Ratio (Villa), Riyadh", data, '#84cc16')}
                    {renderChart("Rent to Income Ratio (Apartment), Riyadh", dataApt, '#84cc16')}
                </div>

                <div className="glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
                    <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#34d399' }}>Key Insights</h2>
                    <ul style={{ paddingLeft: '1.5rem', color: '#cbd5e1', lineHeight: '1.8', fontSize: '0.95rem' }}>
                        <li style={{ marginBottom: '1rem' }}> Housing is getting harder to afford, as a result, <strong style={{ color: 'white' }}>more people are choosing to rent</strong> instead of buy.</li>
                        <li>While home-buying conditions have stopped getting worse, the pressure has shifted to the <strong style={{ color: 'white' }}>rental market</strong>, where demand and costs are now becoming increasingly high.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Affordability;
