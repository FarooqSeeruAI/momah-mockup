import React, { useState } from 'react';
import { MessageCircle, Sparkles, ChevronRight, Send, Copy, Clock } from 'lucide-react';

const SPACING = 20; // distance from bottom/right when collapsed (in px)
const PANEL_WIDTH = 380;

const ChatSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'
    const [inputValue, setInputValue] = useState('');

    const toggleSidebar = () => setIsOpen(!isOpen);

    const exampleQuestions = [
        "What are the land prices in Riyadh per policy zone?",
        "What would happen to land prices in Riyadh if the level fee in each district were raised to 7.5%?"
    ];

    return (
        <div
            style={{
                position: 'fixed',
                // ⬇️ When open: dock to right full height; when closed: float at bottom-right with SPACING
                right: isOpen ? 0 : `${SPACING}px`,
                bottom: isOpen ? 0 : `${SPACING}px`,
                top: isOpen ? 0 : undefined,
                width: isOpen ? `${PANEL_WIDTH}px` : 'auto',
                height: isOpen ? '100vh' : 'auto',
                background: isOpen ? '#13403a' : 'transparent',
                borderLeft: isOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
                zIndex: 9999,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isOpen ? '-5px 0 30px rgba(0,0,0,0.3)' : 'none',
                overflow: 'hidden',
                borderRadius: isOpen ? 0 : '16px',
                pointerEvents: isOpen ? 'auto' : 'none',
            }}
        >
            {/* Collapsed State: Floating Trigger */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    aria-label="Open chat"
                    style={{
                        // ⬇️ Remove outer padding so the bubble sits exactly at bottom-right
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        margin: 0,
                        display: 'block',
                        pointerEvents: 'auto',
                    }}
                >
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            background: '#13403a',
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            position: 'relative',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <MessageCircle size={30} strokeWidth={2} style={{ transform: 'scaleX(-1)' }} color="#ffffff" />
                        <div style={{ position: 'absolute', top: 10, right: 10 }}>
                            <Sparkles size={14} fill="#34d399" stroke="none" />
                        </div>
                    </div>
                </button>
            )}

            {/* Expanded State */}
            <div
                style={{
                    width: `${PANEL_WIDTH}px`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    minWidth: `${PANEL_WIDTH}px`,
                }}
            >
                {/* Header */}
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <img src="/arab.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h2 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Assistant</h2>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        aria-label="Close chat"
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 4 }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', padding: '0 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                        onClick={() => setActiveTab('active')}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === 'active' ? '#fff' : 'rgba(255,255,255,0.5)',
                            padding: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            borderBottom: activeTab === 'active' ? '2px solid #fff' : '2px solid transparent',
                            marginBottom: '-1px',
                        }}
                    >
                        Active chat
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === 'history' ? '#fff' : 'rgba(255,255,255,0.5)',
                            padding: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            borderBottom: activeTab === 'history' ? '2px solid #fff' : '2px solid transparent',
                            marginBottom: '-1px',
                        }}
                    >
                        History
                    </button>
                </div>

                {/* Main */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {activeTab === 'active' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Hello!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                                    I'm here to help you explore revenue impact across activities, customers, products, and more. You can deep
                                    dive on any question by asking follow up questions.
                                </p>
                            </div>

                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    Here is a list of <span style={{ color: '#34d399' }}>example questions</span>.
                                    <br />
                                    Select one of them to copy it over to your query.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {exampleQuestions.map((q, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                                borderRadius: 12,
                                                padding: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s',
                                            }}
                                            onClick={() => setInputValue(q)}
                                        >
                                            <span style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.4 }}>{q}</span>
                                            <Copy size={16} color="rgba(255,255,255,0.6)" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'rgba(255,255,255,0.5)',
                                gap: '1rem',
                            }}
                        >
                            <Clock size={32} />
                            <span>No chat history yet</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12,
                            padding: '1rem',
                            height: 140,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                        }}
                    >
                        <textarea
                            placeholder="Type your question here"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '0.9rem',
                                width: '100%',
                                height: '100%',
                                resize: 'none',
                                outline: 'none',
                                fontFamily: 'inherit',
                            }}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                bottom: 12,
                                right: 12,
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff',
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <img src="/arab.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>Hi, Farooq!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
