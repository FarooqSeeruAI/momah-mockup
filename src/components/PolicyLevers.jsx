import React, { useState } from 'react';
import { Toggle, Slider, Select } from './UIComponents';
import { Play, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolicyLevers = () => {
    const [scope, setScope] = useState('Prime + Citywide');
    const [cap, setCap] = useState(2);
    const [speculation, setSpeculation] = useState(15);

    return (
        <div className="animate-enter" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Policy Assumptions & Levers</h1>
                    <p style={{ color: '#94a3b8' }}>Configure the parameters for the "Relaxing Foreign Ownership" scenario.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                        <RotateCcw size={18} /> Reset
                    </button>
                    <Link to="/foreign-ownership/impacts" style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        fontWeight: 600,
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                        textDecoration: 'none'
                    }}>
                        <Play size={18} fill="white" /> Run Simulation
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Column 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <h3 className="font-display" style={{ color: '#34d399', fontSize: '1.2rem', marginBottom: '1.5rem' }}>1. Scope of Opening</h3>
                        <Select
                            label="Eligible Zones"
                            value={scope}
                            options={['Prime Only', 'Prime + Selected Corridors', 'Prime + Citywide']}
                            onChange={setScope}
                        />
                        <Toggle label="Include Villas" checked={true} onChange={() => { }} />
                        <Toggle label="Include Residential Land" checked={false} onChange={() => { }} />
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <h3 className="font-display" style={{ color: '#34d399', fontSize: '1.2rem', marginBottom: '1.5rem' }}>3. Demand Uplift</h3>
                        <Slider
                            label="Incremental Foreign Buyer Share"
                            value={5} min={0} max={15} unit="%"
                            onChange={() => { }}
                        />
                        <Slider
                            label="Speculative Share of Purchases"
                            value={speculation} min={0} max={40} unit="%"
                            onChange={setSpeculation}
                        />
                    </div>
                </div>

                {/* Column 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <h3 className="font-display" style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1.5rem' }}>4. Safeguards</h3>
                        <Select
                            label="Minimum Holding Period"
                            value="2 Years"
                            options={['None', '1 Year', '2 Years', '5 Years']}
                            onChange={() => { }}
                        />
                        <Toggle label="Off-plan Purchase Allowed" checked={true} onChange={() => { }} />
                        <Toggle label="Anti-flip Measures (High Tax)" checked={true} onChange={() => { }} />
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <h3 className="font-display" style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1.5rem' }}>2. Rollout & Phasing</h3>
                        <Select
                            label="Start Date"
                            value="Immediate"
                            options={['Immediate', '6 Months', '12 Months']}
                            onChange={() => { }}
                        />
                        <Slider
                            label="Annual Cap on Transactions"
                            value={cap} min={0} max={10} unit="%"
                            onChange={setCap}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyLevers;
