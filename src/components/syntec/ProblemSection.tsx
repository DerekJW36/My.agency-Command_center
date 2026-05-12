import React from 'react';
import './ProblemSection.css';

const ProblemSection = () => {
    const painPoints = [
        { icon: '👻', text: 'Broken Google Business Profile – invisible to local searchers' },
        { icon: '⭐', text: 'Zero recent reviews while competitors flood 5-stars' },
        { icon: '🕸️', text: 'Outdated website converting at 2% (should be 20-30%)' },
        { icon: '📞', text: 'Manual follow-ups eating 10+ hours/week' },
        { icon: '💸', text: 'Competitors stealing your $50k+ jobs daily' }
    ];

    return (
        <section className="problem-section">
            <div className="container-narrow">
                <h2 className="section-title">
                    Your Shop's Invisible on Google – <br />
                    <span className="text-accent">That's Costing You $100k+/Year</span>
                </h2>

                <div className="pain-points">
                    {painPoints.map((point, index) => (
                        <div key={index} className="pain-point">
                            <span className="pain-icon">{point.icon}</span>
                            <p className="pain-text">{point.text}</p>
                        </div>
                    ))}
                </div>

                <div className="before-after">
                    <div className="comparison-card before">
                        <div className="card-label">Before DCG Syntec AI</div>
                        <div className="card-visual">
                            <div className="ghost-pin">📍</div>
                            <div className="card-text">Ghost town on Google Maps</div>
                        </div>
                        <div className="card-stats">
                            <div className="stat">2 leads/mo</div>
                            <div className="stat">Page 3 Google</div>
                            <div className="stat">3.2★ rating</div>
                        </div>
                    </div>

                    <div className="vs-divider">
                        <span className="vs-text">VS</span>
                    </div>

                    <div className="comparison-card after">
                        <div className="card-label">After DCG Syntec AI</div>
                        <div className="card-visual">
                            <div className="fire-pin">📍🔥</div>
                            <div className="card-text">Top 3 spot, review explosion</div>
                        </div>
                        <div className="card-stats">
                            <div className="stat accent">42 leads/mo</div>
                            <div className="stat accent">Top 3 Pack</div>
                            <div className="stat accent">4.9★ rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
