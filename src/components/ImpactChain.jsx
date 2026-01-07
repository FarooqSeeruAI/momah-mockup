import React from 'react';
import { ArrowRight, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImpactStep = ({ title, items, delay }) => (
    <div className={`glass-card delay-${delay} animate-enter`} style={{
        flex: 1,
        minWidth: '220px',
        padding: '0',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    }}>
        <div style={{
            background: 'rgba(52, 211, 153, 0.15)',
            padding: '1rem',
            borderBottom: '1px solid rgba(52, 211, 153, 0.2)',
            fontWeight: 600,
            color: '#A7F3D0',
            textAlign: 'center',
            fontSize: '0.9rem'
        }}>
            {title}
        </div>
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {items.map((item, idx) => (
                <div key={idx} className="glass" style={{
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#e2e8f0',
                    lineHeight: '1.4',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {item}
                </div>
            ))}
        </div>
    </div>
);

const ImpactArrow = () => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem', color: '#64748b' }}>
        <ArrowRight size={32} strokeWidth={1} />
    </div>
);

const ImpactChain = () => {
    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Impact Transmission Chain</h1>
                    <p style={{ color: '#94a3b8' }}>Logic flow: How relaxing foreign ownership affects key market indicators.</p>
                </div>
                <Link to="/foreign-ownership/prices" className="glass hover-card" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'white',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid rgba(52, 211, 153, 0.5)'
                }}>
                    View Price Projections <ArrowRight size={18} />
                </Link>
            </div>

            <div style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '2rem',
                alignItems: 'stretch'
            }}>
                <ImpactStep
                    title="Policy & Design"
                    delay={1}
                    items={['FO Coverage: % of districts open', 'Buyer Eligibility Criteria', 'Safeguards (Anti-flip tax)']}
                />
                <ImpactArrow />
                <ImpactStep
                    title="Demand & Expectations"
                    delay={2}
                    items={['Increased Foreign Transactions', 'Higher Investor Speculation', 'Shift in Buyer Mix']}
                />
                <ImpactArrow />
                <ImpactStep
                    title="Prices & Liquidity"
                    delay={3}
                    items={['Immediate Price Index Spike', 'Market Liquidity Boost', 'Price Ripples to Neighbors']}
                />
                <ImpactArrow />
                <ImpactStep
                    title="Supply Response"
                    delay={4}
                    items={['New Project Launches', 'Construction Starts (Lagged)', 'Inventory Absorption']}
                />
                <ImpactArrow />
                <ImpactStep
                    title="Fiscal & Macro"
                    delay={5}
                    items={['Higher Tax Revenue (RETT)', 'FDI Inflows / Stock', 'GDP Contribution']}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#fbbf24' }}>⚡</span> Short Term Impacts (12mo)
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Foreign Demand</div>
                            <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <ArrowUpRight size={18} /> Rises Sharply
                            </div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Prices</div>
                            <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <ArrowUpRight size={18} /> Moderate Increase
                            </div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Supply</div>
                            <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <Minus size={18} /> Limited Change
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#34d399' }}>🌱</span> Medium to Long Term
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Foreign Share</div>
                            <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <ArrowRight size={18} /> Stabilises
                            </div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Completions</div>
                            <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <ArrowUpRight size={18} /> Higher Output
                            </div>
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>FDI Stock</div>
                            <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <ArrowUpRight size={18} /> Significant Growth
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactChain;
