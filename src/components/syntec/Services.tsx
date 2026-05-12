import React from 'react';
import './Services.css';

const services = [
    {
        title: "Web Development",
        description: "Custom, high-performance websites built with modern technologies like React, Next.js, and Node.js.",
        icon: "💻"
    },
    {
        title: "App Development",
        description: "Native and cross-platform mobile applications that provide seamless user experiences.",
        icon: "📱"
    },
    {
        title: "Digital Marketing",
        description: "Data-driven SEO and marketing strategies to grow your brand and reach your target audience.",
        icon: "🚀"
    },
    {
        title: "AI Solutions",
        description: "Leverage the power of Artificial Intelligence to automate workflows and gain insights.",
        icon: "🤖"
    }
];

const Services = () => {
    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">Comprehensive digital solutions tailored to your business needs.</p>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card glass-panel">
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
