import React from 'react';
import Toggle from '../common/Toggle';
import Slider from '../common/Slider';
import SegmentedControl from '../common/SegmentedControl';

const ScenarioControls = ({ activeScenario, onScenarioChange, baselineApplied, onBaselineToggle }) => {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="font-display" style={{
                marginBottom: '1rem',
                color: 'var(--color-text-primary)',
                fontSize: '1rem',
                fontWeight: 600
            }}>
                Scenario Configuration
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Baseline Toggle */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Apply Policy Levers</span>
                    <Toggle checked={baselineApplied} onChange={onBaselineToggle} />
                </div>

                <div style={{ opacity: baselineApplied ? 1 : 0.5, pointerEvents: baselineApplied ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                        Active Scenario Profile
                    </p>
                    <SegmentedControl
                        options={[
                            { value: 's1', label: 'Balanced' },
                            { value: 's2', label: 'Aggressive' },
                            { value: 's3', label: 'Conservative' }
                        ]}
                        value={activeScenario}
                        onChange={onScenarioChange}
                        name="scenario-select"
                    />
                </div>

                {/* Dynamic Inputs based on scenario - Simplified for prototype */}
                <div style={{ opacity: baselineApplied ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                    <Slider label="Reform Intensity" value={75} min={0} max={100} formatValue={(v) => `${v}%`} onChange={() => { }} />
                </div>

            </div>
        </div>
    );
};

export default ScenarioControls;
