import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sliders, Activity, TrendingUp, Map as MapIcon, Globe, Menu } from 'lucide-react';
import SegmentedControl from '../common/SegmentedControl';

const MainLayout = () => {
    const [timeContext, setTimeContext] = useState('forecast');
    const [lang, setLang] = useState('en');
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Monitoring', icon: LayoutDashboard },
        { path: '/policies', label: 'Policy Levers', icon: Sliders },
        { path: '/impacts', label: 'Impacts', icon: Activity },
        { path: '/affordability', label: 'Affordability', icon: TrendingUp },
        { path: '/prices', label: 'Prices', icon: MapIcon },
    ];

    const timeOptions = [
        { value: 'historic_long', label: 'Historic (L-Term)' },
        { value: 'historic_short', label: 'Historic (12m)' },
        { value: 'forecast', label: 'Forecast' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation Bar */}
            <header className="glass" style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    {/* Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px', height: '40px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: 'var(--glow-primary)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                            </svg>
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>
                                MoMAH
                            </h1>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Decision Support
                            </span>
                        </div>
                    </div>

                    {/* Main Nav */}
                    <nav style={{ display: 'flex', gap: '0.5rem' }}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.6rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                        background: isActive ? 'var(--color-border)' : 'transparent',
                                        border: isActive ? '1px solid var(--color-border-hover)' : '1px solid transparent',
                                        transition: 'all 0.2s',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 500 : 400
                                    }}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Time Context Switch */}
                    <SegmentedControl
                        options={timeOptions}
                        value={timeContext}
                        onChange={setTimeContext}
                        name="time-context"
                    />



                    <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }} />

                    {/* Language Switch */}
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            color: 'var(--color-text-secondary)',
                            padding: '0.5rem', borderRadius: 'var(--radius-md)',
                            border: '1px solid transparent'
                        }}
                    >
                        <Globe size={20} />
                        <span style={{ fontSize: '0.9rem' }}>{lang.toUpperCase()}</span>
                    </button>

                    <div style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%', background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src="/arab.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                padding: '2rem',
                maxWidth: '1600px',
                width: '100%',
                margin: '0 auto'
            }}>
                <Outlet context={{ timeContext, lang }} />
            </main>
        </div>
    );
};

export default MainLayout;
