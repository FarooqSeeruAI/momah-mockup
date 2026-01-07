import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const TrendIndicator = ({ trend, intent = 'neutral', size = 16, className = '' }) => {
    // trend: 'up' | 'down' | 'flat'
    // intent: 'positive' | 'negative' | 'neutral' (determines color)

    const getColor = () => {
        if (intent === 'neutral') return 'var(--color-text-secondary)';

        if (intent === 'positive') {
            return 'var(--color-text-accent)'; // Green/Teal
        }

        // Negative intent usually means bad (red), but in this theme negative might be represented 
        // differently or we use a warning color. 
        // However, requirements say "Impact legend: Positive, Negative, Neutral".
        // For "Negative", let's use a soft red/rose or orange to fit the teal theme without clashing too much.
        // Let's define a semantic color for negative if not present, or use a hardcoded hex for now 
        // that complements the deep teal. Use a coral/salmon color.
        return '#fb7185';
    };

    const color = getColor();
    const Icon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;

    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', color }}>
            <Icon size={size} strokeWidth={2.5} />
        </div>
    );
};

export default TrendIndicator;
