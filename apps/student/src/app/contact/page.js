"use client";
import React, { useState } from "react";
import { Navbar } from "@uet-panda/shared-ui";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        
        // Auto-reset after 5 seconds
        let timer = 5;
        const interval = setInterval(() => {
          timer -= 1;
          setCountdown(timer);
          if (timer === 0) {
            clearInterval(interval);
            setStatus("idle");
            setCountdown(5); // Reset countdown for next time
          }
        }, 1000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-inter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-uet-navy py-24 px-4 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-uet-gold/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-uet-gold/10 border border-uet-gold/20 px-4 py-2 rounded-full mb-6">
              <Mail size={16} className="text-uet-gold" />
              <span className="text-uet-gold font-bold text-xs uppercase tracking-widest">Connect with us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-6">
              Get in <span className="text-uet-gold">Touch</span>
            </h1>
            <p className="text-blue-100/60 text-lg leading-relaxed max-w-2xl mx-auto italic">
              "We're here to help you with your campus dining experience. Reach out for support, partnerships, or feedback."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow px-4 -mt-12 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-poppins font-bold text-uet-navy mb-8">Contact Information</h2>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <Mail className="text-uet-gold" />, 
                    title: "Email Support", 
                    text: "uetpanda@gmail.com",
                    sub: "Expect a response within 24 hours",
                    link: "mailto:uetpanda@gmail.com"
                  },
                  { 
                    icon: <MapPin className="text-uet-gold" />, 
                    title: "Campus Office", 
                    text: "UET Lahore, GT Road",
                    sub: "Main campus food hub area",
                    link: "#"
                  },
                  { 
                    icon: <Phone className="text-uet-gold" />, 
                    title: "Operating Hours", 
                    text: "8:00 AM - 6:00 PM",
                    sub: "Monday to Saturday",
                    link: "#"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-5 hover:border-uet-gold/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-uet-gold/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                      <a href={item.link} className="font-bold text-uet-navy hover:text-uet-gold transition-colors">{item.text}</a>
                      <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Hint */}
              <div className="bg-uet-navy p-8 rounded-[2rem] text-white relative overflow-hidden mt-8 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-uet-gold/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-uet-gold/20 transition-all" />
                <h3 className="text-lg font-bold mb-2">Follow our Journey</h3>
                <p className="text-blue-100/40 text-sm mb-4">Stay updated with new cafe additions and exclusive campus deals.</p>
                <div className="flex gap-3">
                   <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-uet-gold hover:text-uet-navy transition-all cursor-pointer">
                      <span className="font-bold text-xs">FB</span>
                   </div>
                   <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-uet-gold hover:text-uet-navy transition-all cursor-pointer">
                      <span className="font-bold text-xs">IG</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 relative"
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-uet-navy mb-2">Message Sent!</h3>
                      <p className="text-slate-500 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                      
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {/* Resetting form in {countdown}s... */}
                        </p>
                        <button 
                          onClick={() => setStatus("idle")}
                          className="text-uet-gold font-bold text-sm hover:underline block mx-auto"
                        >
                          Send another message now
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-uet-gold transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-uet-gold transition-all" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input 
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel" 
                          placeholder="+92 300 0000000" 
                          className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-uet-gold transition-all" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea 
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="5" 
                          placeholder="How can we help you today?" 
                          className="w-full bg-slate-50 border-none p-4 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-uet-gold transition-all"
                        ></textarea>
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm">
                          <AlertCircle size={18} />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button 
                        disabled={status === "loading"}
                        type="submit"
                        className="w-full bg-uet-navy text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-navy hover:bg-uet-gold hover:text-uet-navy hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <Loader2 size={22} className="animate-spin" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={20} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
