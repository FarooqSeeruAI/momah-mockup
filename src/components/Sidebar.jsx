import React from 'react';
import { LayoutDashboard, BarChart3, Settings, Map, Activity, Layers, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/affordability', icon: BarChart3, label: 'Affordability' },
        { path: '/foreign-ownership/impacts', icon: Activity, label: 'Impact Chain' },
        { path: '/foreign-ownership/prices', icon: Layers, label: 'Price Scenarios' },
        { path: '/foreign-ownership/map', icon: Map, label: 'Map View' },
        { path: '/foreign-ownership/levers', icon: Settings, label: 'Policy Levers' },
        { path: '/indicators', icon: Menu, label: 'Indicators' },
    ];

    return (
        <div className="glass" style={{
            width: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem 0', // Slightly reduced padding
            gap: '1rem', // Slightly tighter gap
            borderRadius: '16px', // Rounded all corners
            margin: '0 0 1.5rem 1rem', // Adjusted margin to sit nicely under header
            height: 'fit-content', // Auto height
            minHeight: '400px', // Minimum height for visual balance
            position: 'sticky',
            top: '1rem',
            zIndex: 40
        }}>
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? 'active-nav' : ''
                    }
                    style={({ isActive }) => ({
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#34d399' : 'rgba(255,255,255,0.4)',
                        background: isActive ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative'
                    })}
                    title={item.label}
                >
                    {({ isActive }) => (
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    )}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
