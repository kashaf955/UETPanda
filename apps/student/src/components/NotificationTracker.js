"use client";
import React, { useEffect, useRef } from "react";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { db, useAuthContext } from "@uet-panda/shared-config";
import { toast } from "react-hot-toast";

const NotificationTracker = () => {
  const { user } = useAuthContext();
  const prevStatuses = useRef({});

  useEffect(() => {
    if (!user) return;

    const ordersRef = ref(db, "orders");
    const q = query(ordersRef, orderByChild("userId"), equalTo(user.uid));
    
    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const o = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        
        o.forEach(order => {
          const oldStatus = prevStatuses.current[order.id];
          if (oldStatus && oldStatus !== order.status) {
            let message = `Order #${order.id.slice(-6)} status updated to: ${order.status}`;
            let icon = '🔔';

            if (order.status === "Out for Delivery") {
              message = `Your order #${order.id.slice(-6)} has been dispatched! 🛵`;
              icon = '🛵';
            } else if (order.status === "Delivered" || order.status === "Collected") {
              message = `Enjoy your meal! Order #${order.id.slice(-6)} delivered ✅`;
              icon = '✅';
            } else if (order.status === "Ready for Pickup") {
              message = `Your order #${order.id.slice(-6)} is ready for pickup! 🛍️`;
              icon = '🛍️';
            }

            toast.success(message, {
              duration: 8000,
              icon: icon,
              style: {
                borderRadius: '16px',
                background: '#001a4d',
                color: '#fff',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              },
            });
          }
          prevStatuses.current[order.id] = order.status;
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  return null;
};

export default NotificationTracker;
