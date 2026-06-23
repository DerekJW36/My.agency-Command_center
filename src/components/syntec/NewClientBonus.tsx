import React from 'react';
import './CaseStudies.css';

const NewClientBonus = () => {
    const bonusItems = [
        {
            icon: '🤖',
            title: 'Full AI System Build',
            desc: 'Complete deployment of your lead automation, chatbot, and follow-up sequences — live in 48 hours.'
        },
        {
            icon: '🗺️',
            title: 'Site Rebuild + SEO Blitz',
            desc: 'High-conversion landing page + Google local pack attack. We own your zip codes.'
        },
        {
            icon: '⭐',
            title: 'Review Syndicate Launch',
            desc: '5-star flood campaign activated on day one. Your competitors won\'t know what hit them.'
        }
    ];

    return (
        <section id="proof" className="case-studies-section">
            <div className="container">
                <h2 className="section-title">
                    <span className="text-accent">New Client Bonus:</span> We Bet on You First
                </h2>
                <p className="section-subtitle">
                    We're so confident in our system, we flip the risk. You pay half to start — the rest is due only when we deliver results.
                </p>

                {/* Half-Down Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255,45,0,0.12), rgba(255,107,53,0.08))',
                    border: '1px solid rgba(255,45,0,0.3)',
                    borderRadius: '1rem',
                    padding: '3rem 2.5rem',
                    marginBottom: '3rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '2rem',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-muted)', fontFamily: 'var(--font-header)', letterSpacing: '-0.05em' }}>
                            50%
                        </div>
                        <div style={{ color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            Due to Start
                        </div>
                        <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            We build everything. System goes live.
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            background: 'var(--color-accent)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            boxShadow: '0 0 20px var(--color-accent-glow)'
                        }}>→</div>
                        <div style={{ color: 'var(--color-accent)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Results
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-accent)', fontFamily: 'var(--font-header)', letterSpacing: '-0.05em', textShadow: '0 0 30px var(--color-accent-glow)' }}>
                            50%
                        </div>
                        <div style={{ color: 'var(--color-text)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            Due on Delivery
                        </div>
                        <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            You see leads. Then you pay the rest.
                        </div>
                    </div>
                </div>

                {/* What's Included */}
                <div className="cases-grid">
                    {bonusItems.map((item, index) => (
                        <div key={index} className="case-card glass-panel" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                            <h3 className="solution-title" style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
                            <div className="solution-guarantee" style={{ marginTop: '1.25rem' }}>
                                <span className="guarantee-icon">✓</span>
                                Included in your new client package
                            </div>
                        </div>
                    ))}
                </div>

                {/* Risk Reversal Statement */}
                <div className="guarantee-box" style={{ marginTop: '3rem' }}>
                    <h3 className="guarantee-title">🔥 Zero-Risk Entry for New Clients</h3>
                    <p className="guarantee-text">
                        First-time clients pay <strong>half upfront</strong> so we can launch the system. The <strong>second half is only collected after you see qualified leads hitting your calendar</strong>.
                        We don't win unless you win. That's not a slogan — it's how we get paid.
                    </p>
                    <div className="guarantee-stats">
                        <div className="guarantee-stat">
                            <div className="stat-number">50%</div>
                            <div className="stat-label">To Kick Off</div>
                        </div>
                        <div className="guarantee-stat">
                            <div className="stat-number">48hrs</div>
                            <div className="stat-label">System Live</div>
                        </div>
                        <div className="guarantee-stat">
                            <div className="stat-number">50%</div>
                            <div className="stat-label">On Results</div>
                        </div>
                    </div>
                </div>

                <div className="proof-cta">
                    <p className="proof-text">Ready to lock in your new client rate?</p>
                    <a href="#audit-form" className="btn-cta-primary">Claim Your Free Audit &amp; Spot</a>
                </div>
            </div>
        </section>
    );
};

export default NewClientBonus;
