import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building, DollarSign, ArrowRight } from 'lucide-react';

const PolicyCard = ({ title, description, icon: Icon, path, active }) => (
    <div className={`glass-card ${active ? 'hover-card' : ''}`} style={{
        padding: '2rem',
        borderRadius: '24px',
        opacity: active ? 1 : 0.5,
        filter: active ? 'none' : 'grayscale(1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        border: active ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(255,255,255,0.05)',
    }}>
        <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: active ? 'rgba(52, 211, 153, 0.1)' : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: active ? '#34d399' : '#94a3b8'
        }}>
            <Icon size={28} />
        </div>
        <div>
            <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: active ? 'white' : '#94a3b8' }}>{title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>{description}</p>
        </div>
        {active ? (
            <Link to={path} style={{
                marginTop: 'auto',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: '#34d399', fontWeight: 600,
                textDecoration: 'none'
            }}>
                Configure Policy <ArrowRight size={18} />
            </Link>
        ) : (
            <div style={{ marginTop: 'auto', color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Coming Soon
            </div>
        )}
    </div>
);

const PoliciesOverview = () => {
    return (
        <div className="animate-enter" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Strategic Policy Selection</h1>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Select a policy domain to simulate its impact on the housing market ecosystem.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <PolicyCard
                    title="Relaxing Foreign Ownership"
                    description="Allow non-Saudis to own premium real estate, impacting demand, prices, and FDI."
                    icon={Globe}
                    path="/foreign-ownership/levers"
                    active={true}
                />
                <PolicyCard
                    title="White Land Fees (Phase 2)"
                    description="Expand fees to smaller plots to stimulate development and reduce hoarding."
                    icon={Building}
                    path="#"
                    active={false}
                />
                <PolicyCard
                    title="Off-plan Sales Regulations"
                    description="Adjust developer escrow requirements to boost supply velocity."
                    icon={DollarSign}
                    path="#"
                    active={false}
                />
            </div>
        </div>
    );
};

export default PoliciesOverview;
