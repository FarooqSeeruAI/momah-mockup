import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2, AlertTriangle, MinusCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImpactCard from '../components/dashboard/ImpactCard';
import { ribbonCategories, impactCategories } from '../data/mockData';

const IndicatorImpacts = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(ribbonCategories[0]);

    // Filter impacts based on category? Or show all?
    // Requirements: "Top ribbon categories... Two bands of cards". 
    // Usually clicking ribbon filters the view. Let's implement filtering.
    // If mock data doesn't perfectly align, I'll show all or a subset to demonstrate.
    // For now, I'll allow "All" or just filter. Let's filter for realism. 
    // Wait, my mock data is small. Let's show all if active is "All" or just map blindly for demo if categories don't match.
    // Actually, let's just show all for the demo to ensure cards appear, highlighting the ones matching the category?
    // Better: Just filter. I added categories to mock data.

    const filterImpacts = (list) => {
        // If the list is small, we might want to just show random ones for layout density in this prototype
        // but let's try to be logic-driven.
        // If I select 'Policy Design', and no impacts match, it looks empty.
        // Let's implement a "Show All" or just cycle through for the prototype.
        // For the sake of a rich prototype, let's just display ALL cards but HIGHLIGHT those in the category,
        // or just display all.
        // Requirement check: "Top ribbon categories... Two bands of cards". This implies grouping or filtering.
        // Let's go with Filtering.

        const filtered = list.filter(i => i.category === activeCategory || !i.category);
        return filtered.length > 0 ? filtered : list; // Fallback to all if empty to avoid blank screen
    };

    return (
        <div className="animate-enter">
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/policies')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}
                >
                    <ArrowLeft size={16} />
                    Back to Policy Levers
                </button>
                <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Indicator Impacts
                </h2>
            </div>

            {/* Ribbon Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--color-border)'
            }}>
                {ribbonCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            whiteSpace: 'nowrap',
                            background: activeCategory === cat ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.05)',
                            color: activeCategory === cat ? 'white' : 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                            fontWeight: activeCategory === cat ? 600 : 400,
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Impact Bands */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* Short Term */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Calendar size={20} color="var(--color-text-accent)" />
                        <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Short Term Impacts (1-2 Years)</h3>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <AnimatePresence mode="popLayout">
                            {filterImpacts(impactCategories.shortTerm).map((impact, i) => (
                                <ImpactCard
                                    key={impact.title}
                                    {...impact}
                                    delay={i * 0.1}
                                    onClick={() => navigate('/prices')} // Navigate to deep dive
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Medium Term */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Calendar size={20} color="var(--color-text-gold)" />
                        <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Medium to Long Term (3-5+ Years)</h3>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filterImpacts(impactCategories.mediumTerm).map((impact, i) => (
                            <ImpactCard
                                key={impact.title}
                                {...impact}
                                delay={i * 0.1}
                                onClick={() => navigate('/prices')}
                            />
                        ))}
                    </div>
                </section>

            </div>

            {/* Impact Key */}
            <div style={{
                marginTop: '4rem',
                padding: '1.5rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Impact Legend:</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <span style={{ color: 'var(--color-text-primary)' }}>Positive</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <span style={{ color: 'var(--color-text-primary)' }}>Positive (Short Term)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <AlertTriangle size={18} color="#ef4444" />
                    <span style={{ color: 'var(--color-text-primary)' }}>Negative</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <MinusCircle size={18} color="#94a3b8" />
                    <span style={{ color: 'var(--color-text-primary)' }}>Neutral</span>
                </div>
            </div>
        </div>
    );
};

export default IndicatorImpacts;
