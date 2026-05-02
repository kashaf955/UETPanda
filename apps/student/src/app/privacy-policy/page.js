"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "@uet-panda/shared-ui";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Database, UserCheck, RefreshCw, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "1",
      title: "1. Information We Collect",
      icon: <Database className="text-uet-gold" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-uet-navy mb-2">a. Personal Information</h4>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Delivery location within campus</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-uet-navy mb-2">b. Transactional and Usage Data</h4>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>Order history</li>
              <li>Payment details (processed securely via payment gateways)</li>
              <li>User preferences and platform activity</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "2",
      title: "2. Use of Information",
      icon: <UserCheck className="text-uet-gold" />,
      content: (
        <div className="space-y-2">
          <p className="text-slate-600">The collected information is used to:</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Process and manage orders</li>
            <li>Facilitate deliveries</li>
            <li>Enable secure payment transactions</li>
            <li>Improve platform performance and user experience</li>
            <li>Provide customer support and notifications</li>
          </ul>
        </div>
      )
    },
    {
      id: "3",
      title: "3. Payment Information",
      icon: <Lock className="text-uet-gold" />,
      content: (
        <p className="text-slate-600 leading-relaxed">
          Online payments are processed through secure third-party payment gateways. UET Panda does not store sensitive financial information such as card details. All transactions are encrypted and handled in compliance with applicable security standards.
        </p>
      )
    },
    {
      id: "4",
      title: "4. Data Sharing",
      icon: <RefreshCw className="text-uet-gold" />,
      content: (
        <div className="space-y-2">
          <p className="text-slate-600">User information may be shared with:</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Cafeterias, for order preparation</li>
            <li>Delivery personnel, for order fulfillment</li>
            <li>Payment service providers, for processing transactions</li>
          </ul>
          <p className="text-uet-navy font-bold mt-4 italic">We do not sell, rent, or trade user data to third parties.</p>
        </div>
      )
    },
    {
      id: "5",
      title: "5. Data Security",
      icon: <Shield className="text-uet-gold" />,
      content: (
        <div className="space-y-2">
          <p className="text-slate-600">We implement appropriate technical and organizational measures to protect user data, including:</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Secure authentication systems</li>
            <li>Encrypted communication</li>
            <li>Restricted data access</li>
          </ul>
          <p className="text-xs text-slate-400 mt-2 italic text-center">Despite these measures, no system can guarantee complete security.</p>
        </div>
      )
    }
  ];

  const secondarySections = [
    { title: "Cookies & Tracking", icon: <Eye size={18} />, text: "Cookies may be used to enhance user experience, store preferences, and analyze platform usage. Users can manage or disable cookies through their browser settings." },
    { title: "User Rights", icon: <UserCheck size={18} />, text: "Users have the right to access their personal information, update or correct their data, or request deletion of their account." },
    { title: "Data Retention", icon: <Database size={18} />, text: "User data is retained only for as long as necessary to fulfill operational and legal requirements." },
    { title: "Third-Party Services", icon: <Shield size={18} />, text: "The platform may integrate third-party services such as authentication and payment systems. These services operate under their own privacy policies." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-inter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-uet-navy py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-uet-gold/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-uet-gold/5 rounded-full blur-2xl -ml-32 -mb-32" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-uet-gold/10 border border-uet-gold/20 px-4 py-2 rounded-full mb-6">
              <Shield size={16} className="text-uet-gold" />
              <span className="text-uet-gold font-bold text-xs uppercase tracking-widest">Legal & Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Privacy <span className="text-uet-gold">Policy</span>
            </h1>
            <p className="text-blue-100/60 text-lg leading-relaxed max-w-2xl mx-auto italic">
              "UET Panda is committed to protecting the privacy and security of user information. This policy explains how we collect, use, and safeguard your data."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="container mx-auto max-w-5xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Detailed Sections */}
            <div className="lg:col-span-2 space-y-8">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-uet-gold/10 rounded-2xl flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-poppins font-bold text-uet-navy">{section.title}</h2>
                  </div>
                  <div className="pl-16">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Grid Cards */}
            <div className="space-y-6">
              {secondarySections.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-uet-gold/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-uet-gold group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-uet-navy text-sm uppercase tracking-wider">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}

              {/* Updates & Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-uet-navy rounded-[2rem] p-8 text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-uet-gold/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-uet-gold/20 transition-all" />
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <RefreshCw size={20} className="text-uet-gold" />
                  Policy Updates
                </h3>
                <p className="text-blue-100/50 text-sm mb-8 leading-relaxed">
                  This Privacy Policy may be updated periodically. Users are encouraged to review it regularly to stay informed.
                </p>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs font-bold text-uet-gold uppercase tracking-[0.2em] mb-4">Need Help?</p>
                  <Link 
                    href="/contact"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all group/btn"
                  >
                    <Mail size={18} className="text-uet-gold" />
                    <span className="font-bold text-sm">Contact Support</span>
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <div className="inline-block px-6 py-3 bg-slate-100 rounded-full border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                Last Updated: May 2026 • © UET PANDA PLATFORM
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
