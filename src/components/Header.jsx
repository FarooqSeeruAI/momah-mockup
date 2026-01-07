import React from 'react';
import { Home, ArrowLeft, Menu, Search, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="glass" style={{
            margin: '1rem 1.5rem',
            padding: '1rem 2rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '1rem',
            zIndex: 50
        }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </div>
                    <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                        <Home size={20} />
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className="font-display" style={{
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: '#f0fdf4'
                        }}>
                            <span style={{ color: 'var(--color-text-gold)' }}>MOMAH</span> DECISION SUPPORT
                        </h1>
                        <div style={{ fontSize: '0.65rem', color: '#a7f3d0', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
                            MINISTRY OF MUNICIPAL RURAL AFFAIRS & HOUSING
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-secondary)' }}>
                    <Search size={20} style={{ cursor: 'pointer' }} />
                    <Bell size={20} style={{ cursor: 'pointer' }} />
                </div>

                <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        <div className="font-display" style={{ color: 'white', fontWeight: 500 }}>Vision 2030 Status</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7, color: 'var(--color-text-gold)' }}>Live Data</div>
                    </div>
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px', // Border width
                        boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
                        overflow: 'hidden'
                    }}>
                        <img
                            src="/arab.jpg"
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
