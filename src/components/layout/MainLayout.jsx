import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Sliders, Activity, TrendingUp, Map as MapIcon, Globe, Menu } from 'lucide-react';
import SegmentedControl from '../common/SegmentedControl';
import ChatSidebar from './ChatSidebar';

const MainLayout = () => {
    const [timeContext, setTimeContext] = useState('forecast');
    const [lang, setLang] = useState('en');
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: LayoutDashboard },
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
                padding: '0.8rem 2rem', // Slightly compacted padding
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {/* Brand / Home Button */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                        <img
                            src="/logo-en.png"
                            alt="MoMAH Logo"
                            style={{ height: '50px', width: 'auto' }}
                        />
                    </Link>

                    {/* Main Nav */}
                    <nav style={{ display: 'flex', gap: '0.5rem' }}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
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

            {/* Chat Sidebar */}
            <ChatSidebar />
        </div>
    );
};

export default MainLayout;
