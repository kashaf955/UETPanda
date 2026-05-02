"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "@uet-panda/shared-ui";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  UserCheck, 
  ShoppingCart, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Lock,
  ArrowRight,
  Info
} from "lucide-react";

const TermsPage = () => {
  const sections = [
    {
      id: "eligibility",
      title: "1. Eligibility",
      icon: <UserCheck className="text-uet-gold" />,
      content: "This platform is intended for students, faculty, staff, and authorized individuals within UET Lahore. By using the website, you confirm that the information provided during registration is accurate and complete."
    },
    {
      id: "accounts",
      title: "2. User Accounts",
      icon: <Lock className="text-uet-gold" />,
      content: "Users are responsible for maintaining the confidentiality of their account credentials. All activities conducted through a user account are the responsibility of the account holder. UET Panda reserves the right to suspend or terminate accounts in case of misuse or violation of these Terms."
    },
    {
      id: "services",
      title: "3. Nature of Services",
      icon: <Info className="text-uet-gold" />,
      content: "UET Panda is a digital platform that facilitates food ordering and delivery within the university campus. It connects users with campus cafeterias and delivery personnel. UET Panda does not prepare or supply food and is not responsible for food preparation."
    },
    {
      id: "orders",
      title: "4. Orders and Payments",
      icon: <ShoppingCart className="text-uet-gold" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Users may place orders through the platform.</li>
          <li>Payments can be made via Cash on Delivery (COD) or online payment methods.</li>
          <li>Users are responsible for ensuring the accuracy of order details and delivery location.</li>
          <li>Once preparation starts, cancellation may not be possible.</li>
        </ul>
      )
    },
    {
      id: "pricing",
      title: "5. Pricing and Availability",
      icon: <Scale className="text-uet-gold" />,
      content: "All prices, menu items, and availability are determined by the respective cafeterias. UET Panda is not responsible for inaccuracies in pricing or temporary unavailability of items."
    },
    {
      id: "delivery",
      title: "6. Delivery Policy",
      icon: <Clock className="text-uet-gold" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Delivery services are limited to designated areas within the UET campus.</li>
          <li>Estimated delivery times are indicative and may vary depending on demand.</li>
          <li>Delays may occur during peak hours or due to unforeseen circumstances.</li>
        </ul>
      )
    }
  ];

  const policyNotes = [
    { title: "User Conduct", text: "Users must use the platform responsibly, avoiding false info or abusive behavior.", icon: <UserCheck size={18} /> },
    { title: "Liability", text: "UET Panda is not liable for food quality or preparation (cafeteria responsibility).", icon: <AlertCircle size={18} /> },
    { title: "Feedback", text: "Reviews must be respectful and genuine. We reserve the right to moderate content.", icon: <MessageSquare size={18} /> },
    { title: "Amendments", text: "Terms may be updated periodically. Continued use constitutes acceptance.", icon: <Clock size={18} /> }
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
              <FileText size={16} className="text-uet-gold" />
              <span className="text-uet-gold font-bold text-xs uppercase tracking-widest">Platform Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Terms & <span className="text-uet-gold">Conditions</span>
            </h1>
            <p className="text-blue-100/60 text-lg leading-relaxed max-w-2xl mx-auto italic">
              "Welcome to UET Panda. These Terms and Conditions govern your access to and use of our website and services. By using this platform, you agree to comply with these Terms. If you do not agree, you should not use the website."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="container mx-auto max-w-5xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Detailed Sections */}
            <div className="lg:col-span-2 space-y-6">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-uet-gold/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-poppins font-bold text-uet-navy mb-3">{section.title}</h2>
                      <div className="text-slate-600 leading-relaxed text-sm">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Sticky Sidebar / Cards */}
            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                {policyNotes.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-uet-gold/30 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-uet-gold">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-uet-navy text-xs uppercase tracking-widest">{item.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}

                {/* Final Agreement Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-uet-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-uet-gold/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-uet-gold/20 transition-all" />
                  
                  <h3 className="text-xl font-bold mb-4">Acceptance</h3>
                  <p className="text-blue-100/50 text-xs mb-8 leading-relaxed">
                    Continued use of the UET Panda platform constitutes acceptance of any revised Terms.
                  </p>
                  
                  <Link 
                    href="/contact"
                    className="flex items-center justify-between bg-uet-gold text-uet-navy p-4 rounded-2xl font-bold text-sm hover:bg-white transition-all group/btn"
                  >
                    <span>Have Questions?</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <div className="inline-block px-8 py-4 bg-slate-100 rounded-full border border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                UET Panda Service Agreement • Version 1.0
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsPage;
