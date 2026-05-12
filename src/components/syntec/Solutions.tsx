import React from 'react';
import './Solutions.css';

const Solutions = () => {
    const solutions = [
        {
            icon: '🤖',
            title: 'AI Agents That Close Deals 24/7',
            description: 'Auto-book consultations, SMS/email follow-ups, qualification. Your AI never sleeps, never misses a lead.',
            guarantee: 'Clients see 15-50 qualified leads/mo – guaranteed or we fix it free.'
        },
        {
            icon: '🗺️',
            title: 'Geo-Optimized Sites + SEO Domination',
            description: 'Custom sites converting 20-30% visitors, local pack domination. We own your Portland zip codes.',
            guarantee: 'Top 3 Google local pack in 90 days or we work free.'
        },
        {
            icon: '⭐',
            title: 'Review & Social Syndicate Machine',
            description: 'Auto-request 5-star floods, X/IG/FB content that pulls leads. Your reputation becomes unstoppable.',
            guarantee: '50+ new 5-star reviews in 6 months or full refund.'
        }
    ];

    return (
        <section id="solutions" className="solutions-section">
            <div className="container">
                <h2 className="section-title">
                    Our Syndicate <span className="text-accent">Solution</span>
                </h2>
                <p className="section-subtitle">
                    Three-pillar AI domination system that floods your calendar with qualified leads
                </p>

                <div className="solutions-grid">
                    {solutions.map((solution, index) => (
                        <div key={index} className="solution-card glass-panel">
                            <div className="solution-icon">{solution.icon}</div>
                            <h3 className="solution-title">{solution.title}</h3>
                            <p className="solution-desc">{solution.description}</p>
                            <div className="solution-guarantee">
                                <span className="guarantee-icon">✓</span>
                                {solution.guarantee}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
