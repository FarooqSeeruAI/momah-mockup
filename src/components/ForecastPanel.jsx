import { ComposedChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Scatter, LabelList } from 'recharts';
import { housingGapData, priceScenarioData, comparisonData } from '../data/mockData';
import { useState, useEffect } from 'react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass" style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)'
            }}>
                <p className="font-display" style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>{label}</p>
                {payload.map((entry, index) => {
                    // Filter out custom gap points from tooltip if needed, or format them nicely
                    if (entry.dataKey === 'gapMid') return null;
                    return (
                        <div key={index} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: entry.color, alignItems: 'center' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }}></span>
                            <span>{entry.name}: <span style={{ fontWeight: 600 }}>{entry.value}</span></span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

const GapBubble = (props) => {
    const { cx, cy, payload } = props;
    if (!payload.gap) return null;

    // Fixed height indicator
    const indicatorHeight = 36;

    return (
        <g>
            {/* Vertical Dimension Line */}
            <line
                x1={cx} y1={cy - indicatorHeight / 2}
                x2={cx} y2={cy + indicatorHeight / 2}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1}
                strokeDasharray="3 3"
            />
            {/* Arrow Heads */}
            <path d={`M${cx - 3},${cy - indicatorHeight / 2 + 4} L${cx},${cy - indicatorHeight / 2} L${cx + 3},${cy - indicatorHeight / 2 + 4}`} fill="none" stroke="rgba(255,255,255,0.5)" />
            <path d={`M${cx - 3},${cy + indicatorHeight / 2 - 4} L${cx},${cy + indicatorHeight / 2} L${cx + 3},${cy + indicatorHeight / 2 - 4}`} fill="none" stroke="rgba(255,255,255,0.5)" />

            {/* Bubble - White with shadow */}
            <circle cx={cx} cy={cy} r={16} fill="white" stroke="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
            <text x={cx} y={cy} dy={4} textAnchor="middle" fill="#0f172a" fontSize={11} fontWeight={800} style={{ fontFamily: 'var(--font-display)' }}>
                {payload.gap}
            </text>
        </g>
    );
};

const ForecastPanel = ({ baselineApplied }) => {
    const [activeView, setActiveView] = useState('balance'); // 'balance' | 'demand' | 'supply' | 'price'

    // Reset view when baseline mode changes
    useEffect(() => {
        if (!baselineApplied) {
            setActiveView('balance');
        } else {
            setActiveView('supply'); // Default to Supply when policy applied
        }
    }, [baselineApplied]);

    // --- Data Preparation ---
    // Process data for charts
    const chartData = housingGapData.baseline.map((d, i) => {
        const baseline = housingGapData.baseline[i];
        const policy = housingGapData.policy[i];

        return {
            ...d,
            year: d.year,
            // Housing Balance (Gap) Data (for baseline view)
            demand: baseline.demand,
            supply: baseline.supply,
            gapMid: (baseline.demand + baseline.supply) / 2,

            // Demand Comparison Data
            demandBase: baseline.demand,
            demandPolicy: policy.demand,

            // Supply Comparison Data
            supplyBase: baseline.supply,
            supplyPolicy: policy.supply,

            // Price Comparison Data
            priceBase: priceScenarioData[i].val,
            pricePolicy: comparisonData.policy[i].val
        };
    });

    return (
        <div className="glass-card" style={{
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                        {!baselineApplied ? 'Housing Balance' :
                            activeView === 'demand' ? 'Demand Simulation' :
                                'Supply Simulation'}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--color-text-secondary)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>
                            Riyadh
                        </span>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                            Units (Thousands)
                        </span>
                    </div>
                </div>

                {/* View Toggle - Only Visible in Policy Mode */}
                {baselineApplied && (
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <button
                            onClick={() => setActiveView('demand')}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                color: activeView === 'demand' ? '#0f172a' : 'rgba(255,255,255,0.6)',
                                background: activeView === 'demand' ? '#38bdf8' : 'transparent', // Sky Blue for Demand
                                transition: 'all 0.2s'
                            }}
                        >
                            Demand
                        </button>
                        <button
                            onClick={() => setActiveView('supply')}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                color: activeView === 'supply' ? '#0f172a' : 'rgba(255,255,255,0.6)',
                                background: activeView === 'supply' ? '#facc15' : 'transparent', // Yellow for Supply
                                transition: 'all 0.2s'
                            }}
                        >
                            Supply
                        </button>
                    </div>
                )}
            </div>

            <div style={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">


                    {/* CASE 1: Baseline / Hidden 'Balance' View or Default -> Show Gap Chart */}
                    {activeView === 'balance' && (
                        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="year"
                                axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
                                tickLine={true}
                                tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
                                tickLine={true}
                                tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}
                                domain={['dataMin - 100', 'dataMax + 100']}
                            />
                            <Legend
                                payload={[
                                    { value: 'Housing Demand', type: 'line', color: '#38bdf8' },
                                    { value: 'Housing Supply', type: 'line', color: '#facc15' }
                                ]}
                                wrapperStyle={{ paddingTop: '2rem', fontSize: '0.85rem', fontFamily: 'var(--font-display)', fontWeight: 500 }}
                            />
                            <Line type="linear" dataKey="demand" stroke="#38bdf8" strokeWidth={3} dot={{ fill: '#38bdf8', r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }}>
                                <LabelList dataKey="demand" position="top" fill="#38bdf8" fontSize={12} fontWeight={700} formatter={(val) => val.toLocaleString()} offset={10} />
                            </Line>
                            <Line type="linear" dataKey="supply" stroke="#facc15" strokeWidth={3} dot={{ fill: '#facc15', r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }}>
                                <LabelList dataKey="supply" position="bottom" fill="#facc15" fontSize={12} fontWeight={700} formatter={(val) => val.toLocaleString()} offset={10} />
                            </Line>
                            <Scatter dataKey="gapMid" shape={<GapBubble />} legendType="none" tooltipType="none" />
                        </ComposedChart>
                    )}

                    {/* CASE 2: DEMAND Simulation View (Dual Shaded Area) */}
                    {activeView === 'demand' && (
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorDemandBase" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="year" axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }} tickLine={true} tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }} tickLine={true} tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }} domain={['dataMin - 100', 'dataMax + 100']} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', borderRadius: '12px' }} itemStyle={{ color: 'white' }} />
                            <Legend
                                payload={[
                                    { value: 'Demand (Baseline)', type: 'plainline', payload: { strokeDasharray: '5 5' }, color: '#94a3b8' },
                                    { value: 'Demand (Policy)', type: 'line', color: '#38bdf8' }
                                ]}
                                wrapperStyle={{ paddingTop: '2rem', fontSize: '0.85rem', fontFamily: 'var(--font-display)', fontWeight: 500 }}
                            />

                            {/* Render Policy (Background/Larger Area) */}
                            <Area
                                type="monotone"
                                dataKey="demandPolicy"
                                name="Demand (Policy)"
                                stroke="#38bdf8"
                                strokeWidth={3}
                                fill="url(#colorDemand)"
                                fillOpacity={1}
                                dot={{ fill: '#38bdf8', r: 5 }}
                                activeDot={{ r: 7 }}
                            >
                                <LabelList dataKey="demandPolicy" position="top" fill="#38bdf8" fontSize={12} fontWeight={700} formatter={(val) => val.toLocaleString()} offset={10} />
                            </Area>

                            {/* Render Baseline (Foreground/Smaller Area) */}
                            <Area
                                type="monotone"
                                dataKey="demandBase"
                                name="Demand (Baseline)"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="url(#colorDemandBase)"
                                fillOpacity={1}
                                dot={false}
                                activeDot={false}
                            />
                        </AreaChart>
                    )}

                    {/* CASE 3: SUPPLY Simulation View (Dual Shaded Area) */}
                    {activeView === 'supply' && (
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorSupplyBase" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="year" axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }} tickLine={true} tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }} tickLine={true} tick={{ fill: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }} domain={['dataMin - 100', 'dataMax + 100']} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)', borderRadius: '12px' }} itemStyle={{ color: 'white' }} />
                            <Legend
                                payload={[
                                    { value: 'Supply (Baseline)', type: 'plainline', payload: { strokeDasharray: '5 5' }, color: '#94a3b8' },
                                    { value: 'Supply (Policy)', type: 'line', color: '#facc15' }
                                ]}
                                wrapperStyle={{ paddingTop: '2rem', fontSize: '0.85rem', fontFamily: 'var(--font-display)', fontWeight: 500 }}
                            />

                            {/* Render Policy (Background/Larger Area) */}
                            <Area
                                type="monotone"
                                dataKey="supplyPolicy"
                                name="Supply (Policy)"
                                stroke="#facc15"
                                strokeWidth={3}
                                fill="url(#colorSupply)"
                                fillOpacity={1}
                                dot={{ fill: '#facc15', r: 5 }}
                                activeDot={{ r: 7 }}
                            >
                                <LabelList dataKey="supplyPolicy" position="top" fill="#facc15" fontSize={12} fontWeight={700} formatter={(val) => val.toLocaleString()} offset={10} />
                            </Area>

                            {/* Render Baseline (Foreground/Smaller Area) */}
                            <Area
                                type="monotone"
                                dataKey="supplyBase"
                                name="Supply (Baseline)"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="url(#colorSupplyBase)"
                                fillOpacity={1}
                                dot={false}
                                activeDot={false}
                            />
                        </AreaChart>
                    )}

                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ForecastPanel;
