import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="network-bg"></div>
            <div className="hero-glow hero-glow-1"></div>
            <div className="hero-glow hero-glow-2"></div>

            <div className="container hero-content">
                <h1 className="hero-title">
                    Syndicate Your Revenue – <br />
                    <span className="text-gradient">AI That Books $50k+ Jobs on Autopilot</span>
                </h1>

                <p className="hero-subtitle">
                    Portland's underground AI agency for builders, roofers, painters & hot rod shops.
                    <strong> We crush Google, automate leads, and flood your calendar</strong> – or we work free.
                </p>

                <div className="hero-actions">
                    <a href="#audit-form" className="btn-cta-primary">
                        Claim Your Free AI Lead Audit
                    </a>
                    <a href="#proof" className="btn-cta-secondary">
                        See 10x ROI Proof
                    </a>
                </div>

                <div className="trust-badges">
                    <div className="badge">
                        <div className="badge-number">50+</div>
                        <div className="badge-text">Portland Shops Dominated</div>
                    </div>
                    <div className="badge-divider"></div>
                    <div className="badge">
                        <div className="badge-number">95%</div>
                        <div className="badge-text">Retention Rate</div>
                    </div>
                    <div className="badge-divider"></div>
                    <div className="badge">
                        <div className="badge-number">48hrs</div>
                        <div className="badge-text">Results or Refund</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
