/**
 * BottomNav - Navigasi bawah aplikasi dengan 5 menu.
 * Home, New Arrivals, Saved (Wishlist), Bag (Cart), Profile (Vault).
 * Menu yang halamannya belum diimplementasikan diarahkan ke / secara aman.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: 'home', icon: 'home', label: 'Home', to: '/' },
  { path: 'new-arrivals', icon: 'auto_awesome', label: 'New', to: '/new-arrivals' },
  { path: 'wishlist', icon: 'favorite', label: 'Saved', to: '/' },
  { path: 'cart', icon: 'shopping_bag', label: 'Bag', to: '/', badge: true },
  { path: 'profile', icon: 'person', label: 'Profile', to: '/' },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-surface/90 backdrop-blur-xl border border-outline-variant/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.path}
              to={item.to}
              className={`flex flex-col items-center justify-center min-w-[58px] sm:min-w-[64px] py-1 px-2 rounded-full transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
              data-path={item.path}
            >
              <span className={`material-symbols-outlined text-[20px]`}>{item.icon}</span>
              <span className={`font-label-caps text-[9px] tracking-wider uppercase mt-0.5`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute -top-1 -right-2 font-label-mono text-[9px] text-primary">[1]</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;