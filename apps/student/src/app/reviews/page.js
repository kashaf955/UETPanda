"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@uet-panda/shared-ui";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MessageSquare, 
  Filter, 
  ChevronDown, 
  Utensils, 
  Store,
  Calendar,
  User,
  ArrowRight
} from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "@uet-panda/shared-config";
import Image from "next/image";

const ReviewsPage = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [groupedReviews, setGroupedReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // all, cafe1, cafe2, cafe3, cafe4

  const cafeNames = {
    cafe1: "Bhola",
    cafe2: "GSSC",
    cafe3: "BSSC",
    cafe4: "Annexe",
  };

  useEffect(() => {
    const reviewsRef = ref(db, "reviews");
    const unsub = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.entries(data).map(([id, val]) => ({
          id,
          ...val
        })).filter(r => !r.isHidden);

        setAllReviews(reviewsArray);

        // Group by itemId
        const groups = {};
        reviewsArray.forEach(review => {
          const itemId = review.itemId;
          if (!groups[itemId]) {
            groups[itemId] = {
              itemInfo: {
                name: review.itemName || "Unknown Item",
                image: review.itemImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
                cafeId: review.cafeId,
                cafeName: cafeNames[review.cafeId] || "Campus Cafe"
              },
              reviews: [],
              avgRating: 0,
              totalRating: 0
            };
          }
          groups[itemId].reviews.push(review);
          groups[itemId].totalRating += review.rating;
        });

        // Calculate averages
        Object.keys(groups).forEach(itemId => {
          groups[itemId].avgRating = (groups[itemId].totalRating / groups[itemId].reviews.length).toFixed(1);
          // Sort individual reviews by date (newest first)
          groups[itemId].reviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        });

        setGroupedReviews(groups);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredItems = Object.entries(groupedReviews).filter(([id, data]) => {
    if (activeFilter === "all") return true;
    return data.itemInfo.cafeId === activeFilter;
  });

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-inter">
      <Navbar />

      {/* Hero / Header */}
      <section className="bg-uet-navy py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-uet-gold/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-uet-gold/10 border border-uet-gold/20 px-4 py-2 rounded-full mb-6">
              <Star size={16} className="text-uet-gold fill-uet-gold" />
              <span className="text-uet-gold font-bold text-xs uppercase tracking-[0.2em]">Student Feedback</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
              Reviews & <span className="text-uet-gold">Ratings</span>
            </h1>
            <p className="text-blue-100/60 text-lg max-w-2xl mx-auto italic">
              "See what your fellow students are saying about the best food points across UET campus."
            </p>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { label: "Total Reviews", value: allReviews.length, icon: <MessageSquare size={18} /> },
              { label: "Happy Students", value: "95%", icon: <Star size={18} /> },
              { label: "Average Rating", value: "4.8/5", icon: <Utensils size={18} /> },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white text-center"
              >
                <div className="text-uet-gold flex justify-center mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeFilter === "all" ? "bg-uet-navy text-white" : "bg-white text-slate-400 hover:bg-slate-100"}`}
            >
              All Cafes
            </button>
            {Object.entries(cafeNames).map(([id, name]) => (
              <button 
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeFilter === id ? "bg-uet-gold text-uet-navy" : "bg-white text-slate-400 hover:bg-slate-100"}`}
              >
                {name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-uet-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest">Loading Feedback...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <MessageSquare className="mx-auto text-slate-200 mb-4" size={48} />
               <h3 className="text-xl font-bold text-uet-navy">No reviews found</h3>
               <p className="text-slate-400">Be the first to rate items from this cafe!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredItems.map(([itemId, data], idx) => (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Item Info Sidebar */}
                    <div className="lg:w-1/4 bg-slate-50 p-6 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-slate-100">
                      <div className="inline-block bg-uet-gold/10 px-4 py-1.5 rounded-full text-uet-gold text-[12px] font-bold uppercase tracking-[0.1em] mb-3">
                        {data.itemInfo.cafeName}
                      </div>
                      <h2 className="text-xl font-poppins font-bold text-uet-navy mb-3 line-clamp-2">{data.itemInfo.name}</h2>
                      
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(data.avgRating) ? "text-uet-gold fill-uet-gold" : "text-slate-200"} 
                          />
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-uet-navy">{data.avgRating}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Avg. Rating</p>
                    </div>

                    {/* Review List */}
                    <div className="lg:w-3/4 p-6 lg:p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-uet-navy flex items-center gap-2">
                          <MessageSquare size={18} className="text-uet-gold" />
                          Recent Comments ({data.reviews.length})
                        </h3>
                      </div>
                      
                      <div className="space-y-6">
                        {data.reviews.map((review, rIdx) => (
                          <div key={rIdx} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-uet-gold/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-uet-navy text-white rounded-xl flex items-center justify-center font-bold">
                                  {review.userName?.charAt(0) || "S"}
                                </div>
                                <div>
                                  <p className="font-bold text-uet-navy text-sm">{review.userName || "Student"}</p>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={10} className={i < review.rating ? "text-uet-gold fill-uet-gold" : "text-slate-200"} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                                <Calendar size={12} />
                                {review.timestamp ? new Date(review.timestamp).toLocaleDateString() : "Recently"}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed italic">
                              "{review.comment || "Great taste and quality!"}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ReviewsPage;
