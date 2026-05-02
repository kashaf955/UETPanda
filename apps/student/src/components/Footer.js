"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-uet-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-uet-gold/5 rounded-full -mr-60 -mt-60 blur-[100px] pointer-events-none" />
      <div className="container mx-auto max-w-[1400px] px-4 pt-16 pb-8 relative z-10">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Brand + Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-uet-gold p-2.5 rounded-xl shadow-gold">
                <span className="text-uet-navy font-bold text-2xl leading-none font-poppins">P</span>
              </div>
              <span className="font-poppins font-bold text-2xl tracking-tight">
                UET <span className="text-uet-gold">PANDA</span>
              </span>
            </div>
            <p className="text-blue-100/50 text-sm leading-relaxed max-w-sm">
              The unified food ordering platform for UET Lahore. Order from 5 cafes in one seamless cart.
            </p>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-uet-gold/70 mb-4">Follow Us</p>
              <div className="flex items-center gap-2">
                {[
                  { label: "Facebook", href: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { label: "Instagram", href: "https://www.instagram.com/uet_panda/", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:bg-uet-gold hover:text-uet-navy hover:border-uet-gold hover:scale-110 transition-all duration-200 active:scale-95"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-uet-gold mb-6">Quick Links</p>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms & Conditions", href: "/terms-conditions" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-blue-100/40 hover:text-uet-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-[1px] bg-uet-gold/20 group-hover:w-3 group-hover:bg-uet-gold transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-uet-gold mb-6">Get In Touch</p>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-uet-gold/10 group-hover:border-uet-gold/30 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-uet-gold/60 group-hover:text-uet-gold transition-colors"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 mb-0.5">Campus Address</p>
                  <p className="text-sm text-blue-100/40 leading-relaxed">UET Lahore, Grand Trunk Road, Lahore</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-uet-gold/10 group-hover:border-uet-gold/30 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-uet-gold/60 group-hover:text-uet-gold transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 mb-0.5">Email Support</p>
                  <a href="mailto:uetpanda@gmail.com" className="text-sm text-blue-100/40 hover:text-uet-gold transition-colors">uetpanda@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-uet-gold/10 group-hover:border-uet-gold/30 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-uet-gold/60 group-hover:text-uet-gold transition-colors"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 mb-0.5">Operating Hours</p>
                  <p className="text-sm text-blue-100/40">Mon–Sat &nbsp;8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-blue-100/20 font-medium">
            © {new Date().getFullYear()} UET Panda. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-blue-100/20 font-medium">Built with ❤️ for UET Lahore</span>
            <span className="w-1.5 h-1.5 bg-uet-gold/20 rounded-full" />
            <span className="text-[11px] text-blue-100/20 font-medium">Multi-Vendor Food Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
