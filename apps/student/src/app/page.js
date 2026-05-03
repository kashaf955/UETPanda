"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@uet-panda/shared-ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Utensils,
  Flame,
  Star,
  ShoppingCart,
  Clock,
  Store,
  X,
  Search,
  ClipboardList,
  Lock,
  CheckCircle,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ref, query, orderByChild, limitToFirst, onValue, equalTo } from "firebase/database";
import { db, useCartContext, useAuthContext } from "@uet-panda/shared-config";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

/* ─── Cafe Card Data ───────────────────────────────────── */
const cafes = [
  { id: "cafe1", name: "Bhola", tagline: "Classic desi meals & famous biryani",     specialty: "Biryani & Karahi",    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop&q=80", rating: "Loading...", color: "from-orange-600 to-red-700",    badge: "🔥 Most Popular" },
  { id: "cafe2", name: "GSSC", tagline: "Fresh burgers, sandwiches & crispy fries", specialty: "Fast Food",            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80", rating: "Loading...", color: "from-yellow-500 to-orange-600", badge: "⚡ Quick Bites" },
  { id: "cafe3", name: "BSSC", tagline: "Hot tea, cold drinks & light snacks",      specialty: "Beverages",            image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop&q=80", rating: "Loading...", color: "from-emerald-600 to-teal-700",  badge: "☕ Best Chai" },
  { id: "cafe4", name: "Annexe", tagline: "Shawarmas, rolls & street style eats",     specialty: "Street Food",          image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=80", rating: "Loading...", color: "from-purple-600 to-indigo-700", badge: "🌯 Street Eats" },
];

/* ─── Component ────────────────────────────────────────── */
export default function Home() {
  const cafeSectionRef = useRef(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [reviews, setReviews] = useState({});
  const [cafeRatings, setCafeRatings] = useState({});
  const [viewingFeedback, setViewingFeedback] = useState(null);
  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
  const router = useRouter();

  // Fetch deals from Firebase and interleave them evenly across all cafes
  useEffect(() => {
    const cafesList = ["cafe1", "cafe2", "cafe3", "cafe4"];
    const allFetchedDeals = {};
    const unsubs = [];

    cafesList.forEach(cafeId => {
      const menuRef = ref(db, `menu/${cafeId}`);
      const q = query(menuRef, orderByChild("category"), equalTo("deals"));
      
      const unsub = onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          allFetchedDeals[cafeId] = Object.entries(data)
            .map(([id, val]) => ({ id, ...val, cafeId }))
            .filter(item => !item.isHidden);
        } else {
          allFetchedDeals[cafeId] = [];
        }

        // Interleave deals from all cafes evenly, up to 10
        const mixed = [];
        let index = 0;
        let itemsAdded = true;
        
        while (mixed.length < 10 && itemsAdded) {
          itemsAdded = false;
          for (const cid of cafesList) {
            if (allFetchedDeals[cid] && allFetchedDeals[cid][index]) {
              mixed.push(allFetchedDeals[cid][index]);
              itemsAdded = true;
              if (mixed.length === 10) break;
            }
          }
          index++;
        }
        setFeaturedItems(mixed);
      });
      unsubs.push(unsub);
    });

    return () => unsubs.forEach(fn => fn());
  }, []);

  // Fetch reviews for dynamic ratings
  useEffect(() => {
    const reviewsRef = ref(db, "reviews");
    const unsub = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemGroups = {};
        const cafeGroups = {};
        
        Object.values(data).forEach(review => {
          if (review.isHidden) return;
          
          // Item Level
          const itemId = review.itemId;
          if (!itemGroups[itemId]) itemGroups[itemId] = [];
          itemGroups[itemId].push(review);

          // Cafe Level
          const cafeId = review.cafeId;
          if (!cafeGroups[cafeId]) cafeGroups[cafeId] = [];
          cafeGroups[cafeId].push(review.rating);
        });

        setReviews(itemGroups);
        
        // Calculate cafe averages
        const cRatings = {};
        Object.entries(cafeGroups).forEach(([cid, rs]) => {
          const avg = rs.reduce((a, b) => a + b, 0) / rs.length;
          cRatings[cid] = avg.toFixed(1);
        });
        setCafeRatings(cRatings);
      }
    });
    return () => unsub();
  }, []);

  const getRatingSummary = (itemId) => {
    const itemReviews = reviews[itemId];
    if (!itemReviews || itemReviews.length === 0) return null;
    const avg = itemReviews.reduce((a, b) => a + b.rating, 0) / itemReviews.length;
    return { avg: avg.toFixed(1), count: itemReviews.length };
  };

  const handleAddToCart = (item) => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="
          bg-uet-navy text-white relative overflow-hidden
          min-h-[calc(100dvh-64px)]
          flex flex-col justify-center
        "
      >
        {/* Deep Glow Backgrounds */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-uet-gold/5 rounded-full -mr-[20vw] -mt-[20vw] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full -ml-[20vw] -mb-[20vw] blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* ── Left Content ── */}
            <div className="flex flex-col items-start gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md"
              >
                <Flame size={14} className="text-uet-gold animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-100/90">
                  All Campus Cafes · One Unified Cart
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-poppins font-bold leading-[1.1] text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight"
                >
                  UET <span className="text-uet-gold">PANDA</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl md:text-3xl font-medium text-white/90">Your campus hunger solved.</h2>
                  <p className="text-blue-100/50 max-w-lg font-medium leading-relaxed text-sm md:text-base">
                    Order from any of the <span className="text-uet-gold font-bold">UET cafes</span> — all in one seamless experience.
                  </p>
                </motion.div>
              </div>

              {/* Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-md relative group"
              >
                <div className="absolute inset-0 bg-uet-gold/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl group-focus-within:border-uet-gold/50 transition-all">
                  <div className="pl-4 text-white/30">
                    <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search for cafes or dishes..."
                    className="bg-transparent border-none outline-none flex-grow px-4 py-2 text-sm md:text-base text-white placeholder:text-white/20"
                  />
                  <button className="bg-uet-gold text-uet-navy p-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-gold">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => cafeSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="group bg-uet-gold text-uet-navy px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-gold hover:bg-white transition-all active:scale-95"
                >
                  <Utensils size={18} />
                  <span>Browse Cafes</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/menu"
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
                >
                  <Store size={18} className="text-uet-gold" />
                  <span>View All Menus</span>
                </Link>
              </motion.div>
            </div>

            {/* ── Right Image Content ── */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <Image 
                  src="/heroimg.png" 
                  alt="UET Panda Feast" 
                  width={900} 
                  height={900} 
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* ── Stats & Features Section ── */}
          <div className="mt-16 lg:mt-24 space-y-12">
            
            {/* Stats Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-uet-gold/10 rounded-2xl flex items-center justify-center text-uet-gold group-hover:scale-110 transition-transform">
                    <Store size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-poppins">{cafes.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/40">Active Cafes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group md:border-x border-white/10 md:px-12">
                  <div className="w-14 h-14 bg-uet-gold/10 rounded-2xl flex items-center justify-center text-uet-gold group-hover:scale-110 transition-transform">
                    <ClipboardList size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-poppins">50+</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/40">Menu Items</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-uet-gold/10 rounded-2xl flex items-center justify-center text-uet-gold group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-poppins">15 min</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/40">Avg. Delivery</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Features Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60"
            >
              {[
                { label: "Secure Payments", icon: <Lock size={16} /> },
                { label: "Verified Cafes", icon: <CheckCircle size={16} /> },
                { label: "24/7 Support", icon: <Phone size={16} /> },
                { label: "Loved by Students", icon: <Users size={16} /> },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2.5">
                  <div className="text-uet-gold">{f.icon}</div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => cafeSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/20 hover:text-uet-gold transition-colors lg:hidden"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Cafe Cards Section */}
      <section id="cafes" ref={cafeSectionRef} className="py-20 px-4">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-poppins font-bold text-uet-navy">
              Choose Your <span className="text-uet-gold">Cafe</span>
            </h2>
            <p className="text-slate-500 font-medium mt-3 max-w-xl mx-auto text-sm md:text-base">
              Each cafe has its own unique menu. Pick one to explore and order.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
            {cafes.map((cafe, i) => (
              <motion.div
                key={cafe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)] 2xl:w-[calc(20%-2.5rem)] max-w-[320px]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cafe.image}
                    alt={cafe.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cafe.color} opacity-60`} />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-uet-navy shadow-sm">{cafe.badge}</div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={11} className="text-uet-gold fill-uet-gold" />
                    <span className="text-[11px] font-bold text-uet-navy">
                      {cafeRatings[cafe.id] || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-uet-gold uppercase tracking-[0.22em]">{cafe.specialty}</span>
                  <h3 className="text-xl font-poppins font-bold text-uet-navy mt-1 mb-2">{cafe.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">{cafe.tagline}</p>
                  <Link
                    href={`/cafe/${cafe.id}`}
                    className="group/btn mt-5 flex items-center justify-between bg-uet-navy text-white px-5 py-3.5 rounded-2xl font-bold text-sm hover:bg-uet-gold hover:text-uet-navy transition-all active:scale-95 shadow-md"
                  >
                    <span>Order from {cafe.name}</span>
                    <div className="bg-white/10 p-1.5 rounded-xl">
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section id="deals" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-uet-gold mb-2">Exclusive Offers</p>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-uet-navy">
                Handpicked <span className="text-uet-gold">Deals</span>
              </h2>
            </div>
            <Link
              href="/menu?category=deals"
              className="self-start sm:self-auto flex items-center gap-2 bg-uet-navy text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-uet-gold hover:text-uet-navy transition-all active:scale-95 shadow-md"
            >
              <span>Explore More</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredItems.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <Utensils size={44} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">New deals are added frequently. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-row sm:flex-col"
                >
                  <div className="w-[110px] sm:w-full h-[130px] sm:h-40 bg-slate-200 relative overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 110px, 320px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-uet-navy/90 text-uet-gold text-[11px] font-bold px-2.5 py-1 rounded-full">
                      Rs. {item.price}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col flex-grow min-w-0 justify-between">
                    <div className="flex items-center gap-1 mb-1">
                      <Store size={11} className="text-uet-gold" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {cafes.find(c => c.id === item.cafeId)?.name || item.cafeName || item.cafeId}
                      </span>
                    </div>
                    <h3 className="font-bold text-uet-navy text-sm leading-tight line-clamp-2 flex-grow">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100">
                      <div className="flex items-center text-slate-400 text-[11px] font-medium">
                        <Clock size={11} className="mr-1" />
                        <span>15–20 min</span>
                        {getRatingSummary(item.id || item.name) && (
                          <button 
                            onClick={() => setViewingFeedback(item)}
                            className="flex items-center gap-0.5 ml-3 bg-uet-gold/10 px-1.5 py-0.5 rounded-lg text-uet-navy hover:bg-uet-gold/20 transition-all group/rating"
                          >
                            <Star size={9} className="text-uet-gold fill-uet-gold group-hover/rating:scale-110 transition-transform" />
                            <span className="text-[9px] font-bold">
                              {getRatingSummary(item.id || item.name).avg}
                            </span>
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-[11px] transition-all active:scale-95 ${
                          addedId === item.id
                            ? "bg-green-500 text-white"
                            : "bg-uet-navy text-white hover:bg-uet-gold hover:text-uet-navy"
                        }`}
                      >
                        <ShoppingCart size={13} />
                        <span>{addedId === item.id ? "Added!" : "Add"}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom Explore More */}
          <div className="text-center mt-12">
            <Link
              href="/menu?category=deals"
              className="inline-flex items-center gap-3 bg-uet-navy text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-uet-gold hover:text-uet-navy transition-all active:scale-95 shadow-navy shadow-lg"
            >
              <Utensils size={20} />
              <span>Explore All Deals</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Feedback Modal */}
      <AnimatePresence>
        {viewingFeedback && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingFeedback(null)}
              className="absolute inset-0 bg-uet-navy/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-uet-navy p-6 relative">
                 <button 
                  onClick={() => setViewingFeedback(null)}
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 overflow-hidden relative">
                    <Image
                      src={viewingFeedback.image || `https://via.placeholder.com/100?text=${encodeURIComponent(viewingFeedback.name)}`}
                      alt={viewingFeedback.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{viewingFeedback.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star size={12} className="text-uet-gold fill-uet-gold" />
                      <span className="text-uet-gold font-bold text-sm">
                        {getRatingSummary(viewingFeedback.id || viewingFeedback.name).avg}
                      </span>
                      <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">
                        {getRatingSummary(viewingFeedback.id || viewingFeedback.name).count} Reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4 no-scrollbar">
                {reviews[viewingFeedback.id || viewingFeedback.name]?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((r, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-uet-navy text-xs">{r.userName || "Student"}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-lg border border-slate-100">
                        <Star size={10} className="text-uet-gold fill-uet-gold" />
                        <span className="text-[10px] font-bold text-uet-navy">{r.rating}</span>
                      </div>
                    </div>
                    {r.comment && (
                      <p className="text-slate-600 text-xs leading-relaxed italic mt-2">"{r.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={() => setViewingFeedback(null)}
                  className="text-uet-navy font-bold text-sm hover:text-uet-gold transition-colors"
                >
                  Close Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
