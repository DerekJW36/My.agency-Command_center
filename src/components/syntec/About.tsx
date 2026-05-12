import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about-section">
            <div className="container-narrow">
                <h2 className="section-title">
                    Why <span className="text-accent">DCG Syntec AI</span>?
                </h2>

                <div className="about-content">
                    <div className="about-text">
                        <p className="about-lead">
                            We're not another marketing agency promising "brand awareness" and "engagement."
                        </p>
                        <p>
                            We're a <strong>syndicate of AI operatives</strong> built for non-conformist Portland builders,
                            roofers, painters, and hot rod shops who want <strong>dominance, not excuses</strong>.
                        </p>
                        <p>
                            While other agencies waste your money on vanity metrics, we deploy AI agents that book
                            real consultations, crush Google's local pack, and flood your calendar with qualified leads
                            willing to pay premium prices.
                        </p>
                        <p>
                            Our clients don't play small. They don't accept "good enough." They demand results –
                            and we deliver them, guaranteed, or we work free.
                        </p>
                    </div>

                    <div className="founder-card glass-panel">
                        <div className="founder-header">
                            <div className="founder-avatar">DG</div>
                            <div className="founder-info">
                                <h3 className="founder-name">Derek G.</h3>
                                <div className="founder-title">Founder & Lead Operative</div>
                            </div>
                        </div>
                        <p className="founder-bio">
                            Ex-tech strategist turned AI underground architect. Built DCG Syntec AI after watching
                            too many talented Portland shops get crushed by algorithm changes and lazy marketing agencies.
                            Now running the AI syndicate for shops that refuse to play small.
                        </p>
                        <div className="founder-stats">
                            <div className="founder-stat">
                                <div className="stat-value">50+</div>
                                <div className="stat-label">Shops Dominated</div>
                            </div>
                            <div className="founder-stat">
                                <div className="stat-value">$8M+</div>
                                <div className="stat-label">Revenue Generated</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="manifesto-box">
                    <h3 className="manifesto-title">The Syndicate Manifesto</h3>
                    <ul className="manifesto-list">
                        <li>We eat our own risk – 10x ROI or we work free</li>
                        <li>We cap clients to maintain quality – no factory farming</li>
                        <li>We deploy AI that actually works – no buzzword theater</li>
                        <li>We dominate Google, not just "participate"</li>
                        <li>We flood calendars with qualified leads, not tire-kickers</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
