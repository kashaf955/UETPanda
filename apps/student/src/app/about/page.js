"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@uet-panda/shared-ui";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Network, 
  LayoutGrid, 
  Users, 
  ShieldCheck, 
  Truck, 
  HandCoins,
  ArrowRight,
  Star
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Orders served daily", value: "500+" },
    { label: "Menu options across campus", value: "30+" },
    { label: "Average delivery time", value: "5 min" },
  ];

  const storyItems = [
    {
      title: "The Idea",
      desc: "In 2025, a team of UET students identified inefficiencies in traditional canteen systems and developed a centralized digital solution.",
      icon: <Lightbulb size={20} />,
    },
    {
      title: "Multi-Cafeteria Network",
      desc: "We partner with various campus cafeterias so users can explore diverse menus in one place, without being limited to a single food point.",
      icon: <Network size={20} />,
    },
    {
      title: "Marketplace Experience",
      desc: "Our platform works as a campus marketplace, where users can discover food options, place orders, and track deliveries in real time.",
      icon: <LayoutGrid size={20} />,
    },
    {
      title: "Community Focused",
      desc: "Every feature, from delivery timing to pricing, is designed based on student needs, ensuring the platform remains practical and affordable.",
      icon: <Users size={20} />,
    }
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col font-inter selection:bg-uet-gold/30">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="bg-uet-navy py-20 lg:py-28 px-4 relative overflow-hidden text-white">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-uet-gold/10 rounded-full blur-[120px] -mr-80 -mt-80" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-uet-gold/5 rounded-full blur-[80px] -ml-40 -mb-40" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-uet-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">UET Panda · Campus Dining</p>
              <h1 className="text-5xl lg:text-7xl font-poppins font-bold leading-[1.1] mb-8">
                About <span className="text-uet-gold">Us</span>
              </h1>
              <p className="text-blue-100/60 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
                Order from multiple UET cafeterias in one place. UET Panda connects students with on-campus food vendors and delivers meals quickly to departments, hostels, and common areas.
              </p>
              
              <div className="flex flex-wrap items-center gap-8 lg:gap-16 pt-6 border-t border-white/10">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl lg:text-4xl font-poppins font-bold text-uet-gold mb-1">{stat.value}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-blue-100/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5"
            >
              <Image 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" 
                alt="Delicious Campus Food"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-uet-navy/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Story Section ─── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
            <div className="lg:w-1/3">
              <p className="text-uet-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Our Story</p>
              <h2 className="text-4xl font-poppins font-bold text-uet-navy leading-tight mb-6">
                Born to connect every UET café to one delivery app.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                UET Panda started as a student-led initiative to solve a common campus problem: long queues, limited time, and lack of menu visibility.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-y-12">
              {storyItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-10 h-10 bg-uet-gold/10 rounded-xl flex items-center justify-center text-uet-gold mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-uet-navy mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini Image Gallery (as seen in reference) */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[400px]">
             <div className="relative rounded-3xl overflow-hidden h-full md:col-span-2">
                <Image src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80" fill alt="Story 1" className="object-cover" />
             </div>
             <div className="relative rounded-3xl overflow-hidden h-full">
                <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" fill alt="Story 2" className="object-cover" />
             </div>
             <div className="space-y-4 h-full">
                <div className="relative rounded-3xl overflow-hidden h-[calc(50%-8px)]">
                  <Image src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" fill alt="Story 3" className="object-cover" />
                </div>
                <div className="relative rounded-3xl overflow-hidden h-[calc(50%-8px)]">
                  <Image src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" fill alt="Story 4" className="object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── Values Section ─── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-uet-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Our Values</p>
            <h2 className="text-4xl font-poppins font-bold text-uet-navy">Three things we never compromise on.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Dark Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-uet-navy p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-uet-gold/10 rounded-full blur-2xl -mr-16 -mt-16" />
              <div>
                 <div className="inline-block bg-uet-gold/10 border border-uet-gold/20 px-3 py-1 rounded-lg text-uet-gold text-[10px] font-bold uppercase tracking-widest mb-6">Our Promise</div>
                 <h3 className="text-2xl font-bold mb-6">One app. Many cafés. Fast delivery across campus.</h3>
                 <p className="text-blue-100/40 text-sm leading-relaxed">
                   We are committed to creating a seamless ordering experience by connecting users with multiple cafeterias while ensuring dependable delivery.
                 </p>
              </div>
              <div className="flex items-center gap-10 mt-12 pt-8 border-t border-white/5">
                <div>
                  <p className="text-2xl font-bold text-uet-gold mb-0.5">500+</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Daily Orders</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <p className="text-2xl font-bold text-uet-gold">4.8</p>
                    <Star size={16} className="text-uet-gold fill-uet-gold" />
                  </div>
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">User Satisfaction</p>
                </div>
              </div>
            </motion.div>

            {/* Value Points */}
            <div className="lg:col-span-3 space-y-4">
               {[
                 { title: "Choice & Affordability", desc: "Students can compare options across different cafeterias and select meals that suit their preferences and budget.", icon: <HandCoins className="text-uet-gold" />, tag: "Always Low Pricing" },
                 { title: "Efficient Delivery", desc: "Orders are managed through a structured system that ensures smooth processing and timely delivery within campus.", icon: <Truck className="text-uet-gold" />, tag: "Fast and Reliable" },
                 { title: "Quality Standards", desc: "We collaborate with cafeterias that meet hygiene and service expectations, supported by real user feedback.", icon: <ShieldCheck className="text-uet-gold" />, tag: "Campus Approved" }
               ].map((v, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start gap-6 group hover:border-uet-gold/30 transition-all"
                 >
                   <div className="w-12 h-12 bg-uet-gold/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     {v.icon}
                   </div>
                   <div className="flex-grow">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="text-lg font-bold text-uet-navy">{v.title}</h4>
                        <span className="hidden sm:block text-[9px] font-bold bg-slate-50 px-2 py-1 rounded text-slate-400 uppercase tracking-wider">{v.tag}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Call To Action ─── */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-uet-navy rounded-[3.5rem] p-12 lg:p-20 text-center relative overflow-hidden"
           >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-uet-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-uet-gold/5 rounded-full blur-2xl -ml-24 -mb-24" />
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-white mb-6">
                  Craving something? <span className="text-uet-gold">Order Now.</span>
                </h2>
                <p className="text-blue-100/50 text-lg lg:text-xl max-w-2xl mx-auto mb-12">
                  Browse cafeterias, choose your meal, and get it delivered anywhere within the UET campus.
                </p>
                
                <Link 
                  href="/"
                  className="inline-flex items-center gap-3 bg-uet-gold text-uet-navy px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-gold active:scale-95"
                >
                  Order from Cafés
                  <ArrowRight size={22} />
                </Link>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
