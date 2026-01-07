import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PolicyLeverRow from '../components/dashboard/PolicyLeverRow';
import ScenarioControls from '../components/dashboard/ScenarioControls';
import { policyLevers } from '../data/mockData';

const PolicyLevers = () => {
    const navigate = useNavigate();
    const [showConfig, setShowConfig] = useState(false);
    const [activeScenario, setActiveScenario] = useState('s1');

    return (
        <div className="animate-enter">
            {/* Header / Breadcrumb area */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <button
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}
                    >
                        <ArrowLeft size={16} />
                        Back to Monitoring
                    </button>
                    <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Policy Levers
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Activate and configure interventions to simulate market outcomes.
                    </p>
                </div>

                {/* Scenario Controls Panel - Optional placement, maybe side or modal? 
                    Requirements say "Clicking Clicking Extended ... opens ... Clicking Assumptions ... opens Policy Assumptions".
                    Let's show it as a side panel or just inline for now.
                */}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>

                {/* Main List */}
                <div>
                    {/* Header Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(300px, 2fr) 1fr 1fr 1fr 1.5fr',
                        padding: '0 1.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        letterSpacing: '0.05em',
                        fontWeight: 600
                    }}>
                        <div>Intervention</div>
                        <div>Demand Impact</div>
                        <div>Supply Impact</div>
                        <div>Price Impact</div>
                        <div style={{ textAlign: 'right' }}>Analysis</div>
                    </div>

                    {policyLevers.map((lever) => (
                        <PolicyLeverRow
                            key={lever.id}
                            lever={lever}
                            onDetailsClick={() => setShowConfig(true)}
                            onImpactsClick={() => navigate('/impacts')}
                        />
                    ))}
                </div>

                {/* Configuration Side Panel (Sticky) */}
                <div style={{ position: 'sticky', top: '2rem' }}>
                    {showConfig ? (
                        <div className="animate-enter">
                            <ScenarioControls
                                activeScenario={activeScenario}
                                onScenarioChange={setActiveScenario}
                                baselineApplied={true}
                                onBaselineToggle={() => { }}
                            />
                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <button
                                    onClick={() => setShowConfig(false)}
                                    style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', textDecoration: 'underline' }}
                                >
                                    Close Configuration
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            padding: '2rem',
                            border: '2px dashed var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center',
                            color: 'var(--color-text-muted)'
                        }}>
                            <p>Select "Configure Assumptions" on a lever to adjust parameters.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PolicyLevers;
