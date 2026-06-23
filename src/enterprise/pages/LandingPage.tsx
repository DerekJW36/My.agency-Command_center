/**
 * Enterprise AI Automation Consulting Landing Page
 * Portland-based agency for AI integration & automation
 */

import React, { useState, useEffect } from 'react';
import CircuitBoard from '../components/CircuitBoard';
import { designTokens } from '../design-system/theme';
import { allAgentSkills, exampleWorkflows } from '../agents/skills-framework';
import '../pages/styles/landing-page.css';

interface LandingPageProps {
    theme?: 'light' | 'dark';
}

export const EnterpriseLandingPage: React.FC<LandingPageProps> = ({ theme = 'dark' }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeWorkflow, setActiveWorkflow] = useState(0);

    const colors = theme === 'dark' ? designTokens.dark : designTokens.light;

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getSkillCount = () => {
        return Object.values(allAgentSkills).reduce((sum, skills) => sum + skills.length, 0);
    };

    return (
        <div className={`landing-page landing-page--${theme}`}>
            {/* Circuit Board Background */}
            <div className="circuit-background" style={{ zIndex: 0 }}>
                <CircuitBoard theme={theme} intensity={0.5} interactive={true} />
            </div>

            {/* Hero Section */}
            <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hero__content">
                    <div className="hero__badge">
                        <span className="badge-text">AI Automation • Portland</span>
                    </div>

                    <h1 className="hero__title glow-gold">
                        Enterprise AI Automation
                        <br />
                        Consulting & Integration
                    </h1>

                    <p className="hero__subtitle">
                        Transform your enterprise with intelligent automation, powered by AI-driven strategy,
                        market research, and implementation expertise.
                    </p>

                    <div className="hero__cta">
                        <button className="btn btn--primary btn--lg" onClick={() => { }}>
                            Schedule Strategy Call
                        </button>
                        <button className="btn btn--secondary btn--lg" onClick={() => { }}>
                            View Our Approach
                        </button>
                    </div>

                    <div className="hero__stats">
                        <div className="stat">
                            <span className="stat__value">{getSkillCount()}+</span>
                            <span className="stat__label">AI Agent Skills</span>
                        </div>
                        <div className="stat">
                            <span className="stat__value">{exampleWorkflows.length}</span>
                            <span className="stat__label">Transformation Workflows</span>
                        </div>
                        <div className="stat">
                            <span className="stat__value">7</span>
                            <span className="stat__label">Specialized Agent Teams</span>
                        </div>
                    </div>
                </div>

                {/* Interactive 3D Elements */}
                <div className="hero__decoration">
                    <div className="circuit-node" style={{ animationDelay: '0s' }}></div>
                    <div className="circuit-node" style={{ animationDelay: '0.2s' }}></div>
                    <div className="circuit-node" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services" style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <h2 className="section__title">AI Agent Capabilities</h2>
                    <p className="section__subtitle">
                        Multi-agent orchestration for comprehensive business transformation
                    </p>

                    <div className="services-grid">
                        {Object.entries(allAgentSkills).map(([category, skills]) => (
                            <div key={category} className={`service-card service-card--${theme}`}>
                                <div className="service-card__header">
                                    <h3 className="service-card__title">
                                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </h3>
                                    <div className="service-card__badge">{skills.length} Skills</div>
                                </div>

                                <ul className="service-card__skills">
                                    {skills.slice(0, 3).map((skill) => (
                                        <li key={skill.id} className="skill-item">
                                            <span className="skill-item__bullet"></span>
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>

                                <button className="service-card__cta">Explore Skills →</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflows Section */}
            <section className="workflows" style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <h2 className="section__title">Transformation Workflows</h2>
                    <p className="section__subtitle">
                        Orchestrated multi-agent workflows for complete business transformation
                    </p>

                    <div className="workflow-selector">
                        {exampleWorkflows.map((workflow, idx) => (
                            <button
                                key={workflow.id}
                                className={`workflow-btn ${activeWorkflow === idx ? 'active' : ''}`}
                                onClick={() => setActiveWorkflow(idx)}
                            >
                                {workflow.name}
                            </button>
                        ))}
                    </div>

                    <div className="workflow-detail">
                        {exampleWorkflows[activeWorkflow] && (
                            <>
                                <h3>{exampleWorkflows[activeWorkflow].name}</h3>
                                <p>{exampleWorkflows[activeWorkflow].description}</p>

                                <div className="workflow-sequence">
                                    <h4>Agent Sequence:</h4>
                                    <ol>
                                        {exampleWorkflows[activeWorkflow].sequence.map((step, idx) => (
                                            <li key={idx}>
                                                <strong>{step.agentId}</strong> → {step.skillId}
                                                {step.dependsOn && (
                                                    <span className="dependency">
                                                        (depends on: {step.dependsOn.join(', ')})
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="workflow-meta">
                                    <div className="meta-item">
                                        <strong>Expected Outcome:</strong>
                                        <p>{exampleWorkflows[activeWorkflow].expectedOutcome}</p>
                                    </div>
                                    <div className="meta-item">
                                        <strong>Target Audience:</strong>
                                        <p>{exampleWorkflows[activeWorkflow].targetAudience}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="value-prop" style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <h2 className="section__title">Why Choose Our Enterprise Approach</h2>

                    <div className="value-grid">
                        <div className={`value-card value-card--${theme}`}>
                            <div className="value-card__icon">🤖</div>
                            <h3>Multi-Agent Architecture</h3>
                            <p>Specialized AI agents working in orchestrated workflows for comprehensive solutions</p>
                        </div>

                        <div className={`value-card value-card--${theme}`}>
                            <div className="value-card__icon">🎯</div>
                            <h3>Structured & Scalable</h3>
                            <p>Enterprise-grade frameworks with clear workflows, templates, and reusable components</p>
                        </div>

                        <div className={`value-card value-card--${theme}`}>
                            <div className="value-card__icon">📊</div>
                            <h3>SEO/GEO/AEO Ready</h3>
                            <p>Optimized for search engines, local discovery, and AI-powered search integration</p>
                        </div>

                        <div className={`value-card value-card--${theme}`}>
                            <div className="value-card__icon">🚀</div>
                            <h3>Portland-Based Expertise</h3>
                            <p>Local market knowledge combined with enterprise AI automation best practices</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <h2>Ready to Transform Your Enterprise with AI?</h2>
                    <p>Let's discuss your AI automation vision and create a tailored roadmap</p>
                    <button className="btn btn--primary btn--xl">Start Your Transformation</button>
                </div>
            </section>

            {/* Footer */}
            <footer className={`footer footer--${theme}`} style={{ position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <div className="footer__content">
                        <div className="footer__section">
                            <h4>About</h4>
                            <p>Enterprise AI automation consulting powered by multi-agent workflows</p>
                        </div>
                        <div className="footer__section">
                            <h4>Services</h4>
                            <ul>
                                {Object.keys(allAgentSkills).map((service) => (
                                    <li key={service}>
                                        <a href={`#${service}`}>
                                            {service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer__section">
                            <h4>Location</h4>
                            <p>Portland, Oregon</p>
                            <p>Serving enterprise clients worldwide</p>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <p>&copy; 2026 Enterprise AI Consulting. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EnterpriseLandingPage;
