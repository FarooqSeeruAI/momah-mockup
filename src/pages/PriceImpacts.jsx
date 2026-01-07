import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map as MapIcon, Sliders } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { multiScenarioData } from '../data/mockData';
import MapView from '../components/dashboard/MapView';
import SegmentedControl from '../components/common/SegmentedControl';

const PriceImpacts = () => {
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);
    const [activeScenario, setActiveScenario] = useState('all');

    return (
        <div className="animate-enter">
            {/* Map Modal */}
            {showMap && <MapView onClose={() => setShowMap(false)} />}

            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                    <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Price Projections
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Analyze price trajectories under different policy scenarios.
                    </p>
                </div>

                <button
                    onClick={() => setShowMap(true)}
                    className="glass"
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        color: 'white',
                        border: '1px solid var(--color-border-hover)'
                    }}
                >
                    <MapIcon size={20} />
                    Open Map View
                </button>
            </div>

            {/* Main Content */}
            <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Scenario Selector chips logic here if needed, or Legend handles it */}
                        <SegmentedControl
                            options={[
                                { value: 'all', label: 'All Scenarios' },
                                { value: 'S1', label: 'Balanced' },
                                { value: 'S2', label: 'Aggressive' },
                                { value: 'S3', label: 'Conservative' }
                            ]}
                            value={activeScenario}
                            onChange={setActiveScenario}
                            name="chart-scenario"
                        />
                    </div>
                </div>

                <div style={{ height: '500px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={multiScenarioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorS1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorS2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorS3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} domain={[3000, 8000]} />
                            <Tooltip
                                contentStyle={{ background: 'var(--color-bg-deep)', borderColor: 'var(--color-border)', borderRadius: '12px' }}
                                itemStyle={{ padding: 0 }}
                                formatter={(value, name) => [value, name === 'Actual' ? 'Historical' : name]}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />

                            {/* Actual / Baseline */}
                            <Area type="monotone" dataKey="Actual" stroke="#94a3b8" strokeWidth={3} fill="transparent" name="Historical" dot={{ r: 4 }} />

                            {/* Scenarios - Conditionally render based on activeScenario or render all */}
                            {(activeScenario === 'all' || activeScenario === 'S1') && (
                                <Area type="monotone" dataKey="S1" stroke="#34d399" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorS1)" name="S1: Balanced" />
                            )}
                            {(activeScenario === 'all' || activeScenario === 'S2') && (
                                <Area type="monotone" dataKey="S2" stroke="#f472b6" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorS2)" name="S2: Aggressive" />
                            )}
                            {(activeScenario === 'all' || activeScenario === 'S3') && (
                                <Area type="monotone" dataKey="S3" stroke="#fbbf24" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorS3)" name="S3: Conservative" />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PriceImpacts;
