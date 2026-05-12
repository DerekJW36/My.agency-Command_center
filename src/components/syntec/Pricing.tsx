import React from 'react';
import './Pricing.css';

const Pricing = () => {
    return (
        <section id="pricing" className="pricing-section">
            <div className="container-narrow">
                <h2 className="section-title">
                    Elite Syndicate Access – <span className="text-accent">Limited Spots Open</span>
                </h2>

                <div className="scarcity-alert">
                    <span className="scarcity-badge">⚠️ Only 5 New Clients This Month</span>
                    <p>We cap intake to maintain 95% retention and deliver results. Claim your spot before it's gone.</p>
                </div>

                <div className="pricing-grid">
                    <div className="pricing-card">
                        <div className="pricing-label">One-Time Setup</div>
                        <div className="pricing-amount">
                            <span className="currency">$</span>
                            <span className="price">10,000</span>
                        </div>
                        <ul className="pricing-features">
                            <li>AI bot deployment & training</li>
                            <li>Complete site rebuild (conversion-optimized)</li>
                            <li>Google Business Profile takeover</li>
                            <li>Initial review syndicate setup</li>
                            <li>48-hour activation</li>
                        </ul>
                    </div>

                    <div className="pricing-card featured">
                        <div className="featured-badge">Most Popular</div>
                        <div className="pricing-label">Monthly Retainer</div>
                        <div className="pricing-amount">
                            <span className="currency">$</span>
                            <span className="price">3,000</span>
                            <span className="price-range">-5,000</span>
                        </div>
                        <ul className="pricing-features">
                            <li>Full AI automation & scaling</li>
                            <li>Ongoing SEO domination</li>
                            <li>Review & social syndicate</li>
                            <li>Weekly performance reports</li>
                            <li>Priority support</li>
                        </ul>
                    </div>
                </div>

                <div className="guarantee-box">
                    <h3 className="guarantee-title">🔥 Iron-Clad 10x ROI Guarantee</h3>
                    <p className="guarantee-text">
                        If we don't deliver <strong>10x ROI in 90 days</strong>, we work free forever + refund your entire setup fee.
                        No questions asked. No fine print. We eat our own risk.
                    </p>
                    <div className="guarantee-stats">
                        <div className="guarantee-stat">
                            <div className="stat-number">95%</div>
                            <div className="stat-label">Client Retention</div>
                        </div>
                        <div className="guarantee-stat">
                            <div className="stat-number">$0</div>
                            <div className="stat-label">Refunds Issued</div>
                        </div>
                        <div className="guarantee-stat">
                            <div className="stat-number">48hrs</div>
                            <div className="stat-label">Avg. First Lead</div>
                        </div>
                    </div>
                </div>

                <div className="pricing-cta">
                    <a href="#contact" className="btn-cta-primary btn-large">
                        Claim Your Spot – Free AI Audit
                    </a>
                    <p className="cta-subtext">No credit card required. 30-minute strategy call.</p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
