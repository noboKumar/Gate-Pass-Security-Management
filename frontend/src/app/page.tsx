"use client";

import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Header shadow on scroll
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add("shadow-sm");
        } else {
          header.classList.remove("shadow-sm");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for counter animation
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            const target = +(counter.getAttribute("data-target") || "0");
            const inc = target / speed;

            const updateCount = () => {
              const currentText = counter.innerText.replace(/,/g, "");
              const current = +currentText;
              if (current < target) {
                const nextVal = Math.ceil(current + inc);
                counter.innerText = (
                  nextVal > target ? target : nextVal
                ).toLocaleString();
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
            updateCount();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((c) => observer.observe(c));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-container-margin grid-cols-1 gap-16 items-center relative z-10 flex flex-col">
            <div className="space-y-stack-lg text-center">
              <h1 className="text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] font-display font-bold text-on-surface tracking-tight">
                Smart{" "}
                <span className="gradient-text">
                  Visitor &amp; Gate Pass
                  <br />
                </span>{" "}
                Management
              </h1>
              <p className="text-[15px] md:text-[20px] text-on-surface-variant text-center leading-relaxed opacity-90">
                Digitally manage visitors, employee gate passes, security logs,{" "}
                <br />
                and office access from one centralized, high-fidelity platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-body-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Get Started
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
                <button className="bg-white border border-slate-200 text-on-surface-variant px-8 py-4 rounded-xl font-headline-md text-body-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="pb-5 bg-slate-50/50" id="features">
          <div className="max-w-7xl mx-auto px-container-margin">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-headline-lg lg:text-[42px] font-display text-on-surface">
                Everything you need for a <br className="hidden md:block" />{" "}
                secure, frictionless office gate.
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                One platform that scales from single-entry offices to
                multi-tenant corporate complexes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Card 1: Registration */}
              <div className="md:col-span-2 group relative overflow-hidden bg-white p-stack-lg rounded-2xl border border-slate-200 hover:border-primary/30 transition-all">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 text-on-primary">
                    <span className="material-symbols-outlined text-[32px]">
                      app_registration
                    </span>
                  </div>
                  <div>
                    <h3 className="text-title-lg font-bold mb-2">
                      Self-Service Registration
                    </h3>
                    <p className="text-body-md text-on-surface-variant max-w-md">
                      Table-based pre-registration or walk-in registration with
                      QR code support. Minimize reception wait times by 80%.
                    </p>
                  </div>
                </div>
                <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[300px]">
                    qr_code_2
                  </span>
                </div>
              </div>

              {/* Card 2: History */}
              <div className="group bg-surface-container-low p-stack-lg rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 text-on-secondary">
                  <span className="material-symbols-outlined text-[32px]">
                    history
                  </span>
                </div>
                <h3 className="text-title-lg font-bold mb-2">
                  Visitor History
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Full audit trail of every entry and exit. Search past visits
                  by name, company, or date with instant results.
                </p>
              </div>

              {/* Card 3: Gate Pass */}
              <div className="group bg-surface-container-low p-stack-lg rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-14 h-14 bg-tertiary rounded-xl flex items-center justify-center mb-6 text-on-tertiary">
                  <span className="material-symbols-outlined text-[32px]">
                    fact_check
                  </span>
                </div>
                <h3 className="text-title-lg font-bold mb-2">
                  Employee Gate Pass
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Streamline temporary departures for work or personal needs
                  with digital approval workflows.
                </p>
              </div>

              {/* Card 4: Dashboard */}
              <div className="md:col-span-2 group relative overflow-hidden bg-deep-navy text-white p-stack-lg rounded-2xl transition-all">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                    <span className="material-symbols-outlined text-[32px]">
                      monitoring
                    </span>
                  </div>
                  <div>
                    <h3 className="text-title-lg font-bold mb-2">
                      Security Dashboard
                    </h3>
                    <p className="text-slate-400 max-w-md">
                      Real-time occupancy tracking, emergency roll-calls, and
                      suspicious activity alerts on a single pane of glass.
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent flex items-center justify-center pointer-events-none">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200/40"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-slate-100/20 rounded-full"></div>
                      <div className="w-8 h-8 bg-white/10 rounded-full border border-white/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: In/Out */}
              <div className="group bg-white p-stack-lg rounded-2xl border border-slate-200 hover:border-primary/30 transition-all">
                <div className="w-14 h-14 bg-primary-container rounded-xl flex items-center justify-center mb-6 text-on-primary-container">
                  <span className="material-symbols-outlined text-[32px]">
                    swipe_vertical
                  </span>
                </div>
                <h3 className="text-title-lg font-bold mb-2">Check-In/Out</h3>
                <p className="text-body-md text-on-surface-variant">
                  Lightning-fast badge printing or digital check-out. Automated
                  reminders for visitors who haven't left.
                </p>
              </div>

              {/* Card 6: Reports */}
              <div className="md:col-span-2 group relative overflow-hidden bg-white p-stack-lg rounded-2xl border border-slate-200 hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[32px]">
                      analytics
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-title-lg font-bold mb-2">
                      Automated Compliance Reports
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Generate weekly/monthly visitor traffic reports for
                      compliance and security planning. Export to PDF or CSV in
                      one click.
                    </p>
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-white border border-slate-200 text-on-surface font-bold hover:bg-slate-50 transition-all flex-shrink-0">
                    View Sample
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="max-w-4xl mx-auto px-container-margin text-center relative z-10 space-y-stack-md">
            <h2 className="text-headline-lg lg:text-[48px] font-display text-white">
              Ready to secure your workspace?
            </h2>
            <p className="text-on-primary-container text-body-lg opacity-90 pb-4">
              Join 500+ enterprises that trust GateFlow for their facility
              security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-slate-50 active:scale-95 transition-all">
                Get Started Free
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all">
                Speak to Sales
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
