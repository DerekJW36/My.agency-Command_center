import React from 'react';
import './CaseStudies.css';

const CaseStudies = () => {
    const cases = [
        {
            title: 'SE Portland Roofer',
            before: { leads: 2, revenue: '$8k', rating: 3.2 },
            after: { leads: 42, revenue: '$180k', rating: 4.9 },
            timeline: '45 days',
            highlight: 'From invisible to dominating SE Portland roofing searches'
        },
        {
            title: 'Hot Rod Custom Shop',
            before: { leads: 5, revenue: '$25k', rating: 3.8 },
            after: { leads: 28, revenue: '$240k', rating: 4.8 },
            timeline: '60 days',
            highlight: 'Top Google spot + 60 new reviews, booked 8 $20k+ builds'
        },
        {
            title: 'Commercial Painter',
            before: { leads: 3, revenue: '$15k', rating: 3.5 },
            after: { leads: 35, revenue: '$210k', rating: 4.9 },
            timeline: '52 days',
            highlight: 'Crushed local pack, now turning away work'
        }
    ];

    return (
        <section id="proof" className="case-studies-section">
            <div className="container">
                <h2 className="section-title">
                    <span className="text-accent">Proof:</span> Real Portland Shops, Real Results
                </h2>
                <p className="section-subtitle">
                    Anonymized case studies from our syndicate (names withheld for competitive advantage)
                </p>

                <div className="cases-grid">
                    {cases.map((caseStudy, index) => (
                        <div key={index} className="case-card glass-panel">
                            <div className="case-header">
                                <h3 className="case-title">{caseStudy.title}</h3>
                                <div className="case-timeline">{caseStudy.timeline}</div>
                            </div>

                            <div className="case-metrics">
                                <div className="metric-row">
                                    <div className="metric before">
                                        <div className="metric-label">Before</div>
                                        <div className="metric-value dim">{caseStudy.before.leads} leads/mo</div>
                                        <div className="metric-value dim">{caseStudy.before.revenue} pipeline</div>
                                        <div className="metric-value dim">{caseStudy.before.rating}★</div>
                                    </div>

                                    <div className="metric-arrow">→</div>

                                    <div className="metric after">
                                        <div className="metric-label">After</div>
                                        <div className="metric-value accent">{caseStudy.after.leads} leads/mo</div>
                                        <div className="metric-value accent">{caseStudy.after.revenue} pipeline</div>
                                        <div className="metric-value accent">{caseStudy.after.rating}★</div>
                                    </div>
                                </div>
                            </div>

                            <div className="case-highlight">
                                "{caseStudy.highlight}"
                            </div>
                        </div>
                    ))}
                </div>

                <div className="proof-cta">
                    <p className="proof-text">Want to be our next case study?</p>
                    <a href="#contact" className="btn-cta-primary">Claim Your Free Audit</a>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
