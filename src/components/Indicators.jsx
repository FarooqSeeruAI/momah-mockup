import React from 'react';
import { ArrowUp, ArrowDown, Minus, ArrowRight } from 'lucide-react';

const ImpactCell = ({ icon: Icon, text, color }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0.75rem',
        height: '100%',
        gap: '0.5rem'
    }}>
        {Icon && <Icon size={20} color={color} strokeWidth={3} />}
        <span style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.2' }}>{text}</span>
    </div>
);

const Indicators = () => {
    const policies = [
        { name: "White Land Fee", impacts: [1, 2, 1, 3, 2, 2, 1, 1, 1, 0] },
        { name: "Vacant Real Estate Tax", impacts: [0, 0, 0, 3, 2, 2, 1, 1, 1, 0] },
        { name: "Lifting Restrictions", impacts: [1, 1, 1, 2, 2, 2, 1, 1, 1, 3] },
        { name: "Foreign Ownership", impacts: [0, 0, 1, 4, 4, 3, 4, 4, 3, 1] },
        { name: "Rent Caps", impacts: [0, 0, 2, 3, 0, 2, 3, 1, 3, 3] },
    ];

    /* 
      Impact Codes:
      0: Neutral (Minus, Grey)
      1: Positive/Green Up (ArrowUp, Green)
      2: Positive/Green Lag (ArrowRight, Green)
      3: Negative/Red (ArrowUp/Down, Red) - Context dependent, simplifying for prototype
      4: Alerts (Red)
    */

    const getImpact = (code) => {
        switch (code) {
            case 1: return { icon: ArrowUp, color: '#34d399', text: 'Improves' };
            case 2: return { icon: ArrowRight, color: '#34d399', text: 'Improves (Lag)' };
            case 3: return { icon: ArrowDown, color: '#fbbf24', text: 'Pressure Eases' }; // Re-interpreting for specific context from screenshot (Yellow/Orange)
            case 4: return { icon: ArrowUp, color: '#f43f5e', text: 'Price Pressure' };
            default: return { icon: Minus, color: '#64748b', text: 'Neutral / No Impact' };
        }
    };

    return (
        <div className="animate-enter" style={{ overflowX: 'auto', paddingBottom: '2rem' }}>
            <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Indicator Impact Matrix</h1>

            <div style={{ minWidth: '1200px', display: 'grid', gridTemplateColumns: '200px repeat(10, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
                {/* Header Row */}
                <div className="glass" style={{ padding: '1rem', background: '#0f172a' }}></div>
                {['Supply of Land', 'Land Price', 'Housing Completions', 'Vacancy Rate', 'Purchase Price', 'Rent Price', 'Purchase to Income', 'Rent to Income', 'Ownership Rate', 'FDI'].map(h => (
                    <div key={h} className="glass" style={{ padding: '0.75rem', background: '#022c26', color: '#a7f3d0', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        {h}
                    </div>
                ))}

                {/* Rows */}
                {policies.map((policy) => (
                    <React.Fragment key={policy.name}>
                        <div className="glass" style={{ padding: '1rem', background: '#0f172a', color: 'white', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            {policy.name}
                        </div>
                        {policy.impacts.map((code, idx) => {
                            const { icon, color, text } = getImpact(code);
                            return (
                                <div key={idx} className="glass" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <ImpactCell icon={icon} color={color} text={text} />
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Indicators;
