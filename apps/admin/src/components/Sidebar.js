"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight,
  Store,
  MessageSquare,
  Bell,
  Clock
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth, db, useAuthContext } from "@uet-panda/shared-config";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const { cafeId } = useAuthContext();
  const [notifications, setNotifications] = React.useState([]);
  const [showNotifications, setShowNotifications] = React.useState(false);

  React.useEffect(() => {
    if (!cafeId) return;
    const ordersRef = ref(db, "orders");
    const q = query(ordersRef, orderByChild("cafeId"), equalTo(cafeId));
    
    const unsub = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const o = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter(order => order.status === "Preparing")
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(o.slice(0, 5)); // Show last 5 preparing orders
      } else {
        setNotifications([]);
      }
    });

    return () => unsub();
  }, [cafeId]);

  const menuItems = [
    { name: "Inventory", icon: <Package size={20} />, path: "/dashboard/inventory" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/dashboard/orders" },
    { name: "Riders", icon: <Store size={20} />, path: "/dashboard/riders" },
    { name: "Reviews", icon: <MessageSquare size={20} />, path: "/dashboard/feedback" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/dashboard/analytics" },
  ];

  const handleLogout = () => signOut(auth);

  const CAFE_NAMES = {
    cafe1: "Bhola",
    cafe2: "GSSC",
    cafe3: "BSSC",
    cafe4: "Annexe",
  };

  return (
    <aside className="w-64 bg-uet-navy text-white min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10 flex flex-col items-center space-y-1">
        <img src="/logo.png" alt="Logo" style={{ width: '130px', height: 'auto' }} />
        <div className="bg-uet-gold p-2 rounded-xl hidden">
          <Store className="text-uet-navy" size={24} />
        </div>
        <div className="text-center relative">
           <p className="text-base text-blue-100 uppercase font-bold tracking-widest opacity-80 mb-4">
             {CAFE_NAMES[cafeId] || cafeId || 'Cafe Panel'}
           </p>

           {/* Notification Bell */}
           <div className="relative inline-block">
             <button 
               onClick={() => setShowNotifications(!showNotifications)}
               className={`p-3 rounded-2xl transition-all relative ${showNotifications ? 'bg-uet-gold text-uet-navy' : 'bg-white/5 text-blue-100 hover:bg-white/10'}`}
             >
               <Bell size={20} />
               {notifications.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-uet-navy animate-pulse">
                   {notifications.length}
                 </span>
               )}
             </button>

             {/* Notification Dropdown */}
             <AnimatePresence>
               {showNotifications && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   className="absolute left-full ml-4 top-0 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-[100]"
                 >
                   <div className="p-4 bg-uet-navy text-white flex justify-between items-center">
                     <span className="text-xs font-bold uppercase tracking-widest">New Orders</span>
                     <span className="bg-uet-gold text-uet-navy text-[10px] px-2 py-0.5 rounded-full font-bold">{notifications.length}</span>
                   </div>
                   <div className="max-h-80 overflow-y-auto no-scrollbar">
                     {notifications.length === 0 ? (
                       <div className="p-8 text-center">
                         <Clock size={24} className="mx-auto text-slate-200 mb-2" />
                         <p className="text-xs text-slate-400 font-medium italic">No new orders</p>
                       </div>
                     ) : (
                       notifications.map(notif => (
                         <Link 
                           key={notif.id}
                           href="/dashboard/orders"
                           onClick={() => setShowNotifications(false)}
                           className="flex flex-col p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors group"
                         >
                           <div className="flex justify-between items-start mb-1">
                             <span className="text-[10px] font-bold text-uet-navy truncate max-w-[120px]">{notif.userName}</span>
                             <span className="text-[9px] font-bold text-slate-400">#{notif.id.slice(-4).toUpperCase()}</span>
                           </div>
                           <p className="text-[9px] text-slate-500 truncate">{notif.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                         </Link>
                       ))
                     )}
                   </div>
                   <Link 
                     href="/dashboard/orders"
                     onClick={() => setShowNotifications(false)}
                     className="block w-full p-3 bg-slate-50 text-center text-[10px] font-bold text-uet-gold uppercase tracking-widest hover:bg-uet-navy hover:text-white transition-all"
                   >
                     View All Orders
                   </Link>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>
      </div>

      <nav className="flex-grow p-4 mt-6 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
              pathname === item.path 
              ? "bg-uet-gold text-uet-navy shadow-gold translate-x-1" 
              : "hover:bg-white/5 text-blue-100/60 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-bold text-sm tracking-wide">{item.name}</span>
            </div>
            <ChevronRight size={16} className={`transition-transform ${pathname === item.path ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
