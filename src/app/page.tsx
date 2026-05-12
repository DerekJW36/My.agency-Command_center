"use client";

import React from 'react';
import Header from '@/components/syntec/Header';
import Hero from '@/components/syntec/Hero';
import ProblemSection from '@/components/syntec/ProblemSection';
import Solutions from '@/components/syntec/Solutions';
import CaseStudies from '@/components/syntec/CaseStudies';
import Pricing from '@/components/syntec/Pricing';
import About from '@/components/syntec/About';
import SyndicateAuditForm from '@/components/syntec/SyndicateAuditForm';
import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  return (
    <div className="App relative bg-black">
      {/* 3D Background Element for 'Wow' factor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ThreeScene />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <SyndicateAuditForm />
          <ProblemSection />
          <Solutions />
          <CaseStudies />
          <Pricing />
          <About />
        </main>

        <footer id="contact" className="footer">
          <div className="container footer-content">
            <div className="footer-main">
              <h2 className="footer-title">
                Ready to Dominate? <span className="text-accent">Claim Your Free AI Audit</span>
              </h2>
              <p className="footer-subtitle">
                30-minute strategy call. No credit card. No bullshit. Just a roadmap to 10x your revenue.
              </p>
              <a href="#audit-form" className="btn-cta-primary btn-large inline-block">
                Ignite Your Free Audit
              </a>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
              <div className="footer-brand">
                <div className="footer-logo">DCG SYNTEC <span className="text-accent">AI</span></div>
                <p className="footer-tagline">Portland's AI Syndicate for Non-Conformist Builders & Rodders</p>
              </div>

              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:derek@dcgsyntec.ai" className="contact-link">derek@dcgsyntec.ai</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span className="contact-text">Portland, OR</span>
                </div>
              </div>
            </div>

            <div className="footer-legal">
              <p>&copy; {new Date().getFullYear()} DCG Syntec AI. All rights reserved.</p>
              <p className="legal-note">LLC filing in progress</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

