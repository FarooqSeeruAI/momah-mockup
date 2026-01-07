import React, { useState } from 'react';
import { Map, Layers, Navigation, X } from 'lucide-react';
import Toggle from '../common/Toggle';
import SegmentedControl from '../common/SegmentedControl';

const MapView = ({ onClose }) => {
    const [activeLayer, setActiveLayer] = useState('price');
    const [showZones, setShowZones] = useState(true);

    return (
        <div className="animate-enter" style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--color-bg-deep)', // Or glass overlay
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Geospatial Analysis</h2>
                <button
                    onClick={onClose}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <X size={24} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', height: 'calc(100% - 60px)' }}>
                {/* Map Visual */}
                <div className="glass-card" style={{ borderRadius: '24px', position: 'relative', overflow: 'hidden', background: '#020617' }}>
                    {/* Simulated Map Background */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
                        zIndex: 0
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    {/* SVG Zones */}
                    <svg width="100%" height="100%" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
                        {/* Zone A: Prime (North) */}
                        <path
                            d="M 250 150 Q 350 100 500 150 T 650 250 T 450 400 T 250 300 Z"
                            fill="rgba(52, 211, 153, 0.2)"
                            stroke="#34d399"
                            strokeWidth="2"
                            style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                            strokeDasharray={showZones ? "0" : "5 5"}
                        />
                        <text x="400" y="250" fill="white" fontSize="14" fontWeight="600" style={{ textShadow: '0 2px 4px black', pointerEvents: 'none' }}>North Riyadh</text>

                        {/* Zone B: East (Growth) */}
                        <path
                            d="M 670 250 Q 800 200 900 300 T 850 500 T 650 550 T 500 420 Z"
                            fill="rgba(251, 191, 36, 0.15)"
                            stroke="#fbbf24"
                            strokeWidth="2"
                            style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                        />
                        <text x="700" y="400" fill="white" fontSize="14" fontWeight="600" style={{ textShadow: '0 2px 4px black', pointerEvents: 'none' }}>East Expansion</text>

                        {/* Zone C: Center (Established) */}
                        <path
                            d="M 350 450 L 550 450 L 500 650 L 300 600 Z"
                            fill="rgba(239, 68, 68, 0.15)"
                            stroke="#ef4444"
                            strokeWidth="2"
                            style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                        />
                        <text x="400" y="550" fill="white" fontSize="14" fontWeight="600" style={{ textShadow: '0 2px 4px black', pointerEvents: 'none' }}>City Center</text>

                    </svg>

                    {/* Map Controls Overlay */}
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
                        <button className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px', color: 'white' }}>
                            <Map size={16} /> Satellite
                        </button>
                        <button className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px', color: 'white', background: 'rgba(52, 211, 153, 0.2)', borderColor: '#34d399' }}>
                            <Layers size={16} /> Heatmap
                        </button>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Zone Analysis</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Detailed impact drill-down by district and zone code.</p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Navigation size={16} /> Filters
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Show Zones</span>
                                <Toggle checked={showZones} onChange={setShowZones} />
                            </div>

                            <div>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Indicator Layer</span>
                                <SegmentedControl
                                    options={[{ value: 'price', label: 'Price' }, { value: 'supply', label: 'Supply' }]}
                                    value={activeLayer}
                                    onChange={setActiveLayer}
                                    name="map-layer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '1rem', borderRadius: '12px', marginTop: 'auto' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Selected Zone</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>North Riyadh</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Proj. Price Impact</span>
                            <span style={{ color: '#34d399', fontWeight: 600 }}>+8.2%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Inventory</span>
                            <span style={{ color: 'var(--color-text-gold)', fontWeight: 600 }}>12,450 Units</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
