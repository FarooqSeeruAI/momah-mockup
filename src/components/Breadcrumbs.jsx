import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const routeNameMap = {
        'policies': 'Policy Overview',
        'foreign-ownership': 'Foreign Ownership',
        'levers': 'Configuration',
        'impacts': 'Impact Chain',
        'prices': 'Price Projections',
        'map': 'Geospatial Analysis',
        'affordability': 'Affordability',
        'indicators': 'Indicator Matrix'
    };

    return (
        <div style={{ padding: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', hover: { color: 'white' } }}>
                <Home size={16} />
            </Link>
            {pathnames.length > 0 && <ChevronRight size={14} />}

            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const name = routeNameMap[value] || value; // Fallback to path segment if not mapped

                return (
                    <React.Fragment key={to}>
                        {isLast ? (
                            <span style={{ color: '#34d399', fontWeight: 600 }}>{name}</span>
                        ) : (
                            <Link to={to} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{name}</Link>
                        )}
                        {!isLast && <ChevronRight size={14} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
