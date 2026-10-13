import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart3,
  TrendingUp, 
  Receipt, 
  Container, 
  Truck, 
  Layers, 
  LogOut, 
  User, 
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Ship,
  Train,
  FileText,
  FileSpreadsheet,
  Search,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onRefresh, 
  loading, 
  lastUpdated,
  currentUser,
  onLogout,
  onOpenUserManagement
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'analytics', label: 'Branch Wise Analytics', shortLabel: 'Branch Wise', icon: TrendingUp },
    { id: 'sales', label: 'Total Sales', shortLabel: 'Total Sales', icon: Receipt },
    { id: 'containers', label: 'Container / Volumes', shortLabel: 'Containers', icon: Container },
    { id: 'fleet', label: 'Fleet Operations', shortLabel: 'Fleet', icon: Truck },
    { id: 'vessels', label: 'Ocean & Vessel Radar', shortLabel: 'Ocean Hub', icon: Ship, isHighlight: true },
  ];

  // Quick Action Pills directly inspired by actlindia.com website header
  const actlPills = [
    { label: 'Weekly Rake Schedule', icon: Train, onClick: () => setActiveTab('fleet'), badge: 'RAIL' },
    { label: 'Trade Advisory', icon: FileText, onClick: () => setActiveTab('analytics'), badge: 'LIVE' },
    { label: 'Container Tracking', icon: Search, onClick: () => setActiveTab('containers'), badge: 'TRACK' },
    { label: 'ACTL Tariff', icon: FileSpreadsheet, onClick: () => setActiveTab('sales'), badge: '2026-27' },
  ];

  const currentItem = navItems.find(item => item.id === activeTab) || navItems[0];
  const CurrentIcon = currentItem.icon;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm w-full font-sans">
      {/* Top Advisory Strip (ACTL Brand Identity) */}
      <div className="bg-gradient-to-r from-[#D8232A] via-[#B91C1C] to-[#008DD2] text-white text-[11px] font-extrabold px-3 sm:px-6 py-1 tracking-tight flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-black shrink-0">
            ICD FARIDABAD
          </span>
          <span className="truncate">
            Associated Container Terminals Ltd — Northern India's Premier Pioneer Dry Port
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 shrink-0 font-bold text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Direct Rail Connectivity JNPT / Mundra / Pipavav
          </span>
          <span className="text-white/80">|</span>
          <span className="text-white/90">Customer Desk: 0129-4288888</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1750px] mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Company Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setActiveTab('analytics');
                setMobileMenuOpen(false);
              }}
            >
              <img 
                src="/logo.png" 
                alt="ACTL Logo" 
                className="h-10 sm:h-14 w-auto object-contain transition-transform group-hover:scale-102" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/actl_logo.png';
                }}
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-[#D8232A] transition-colors leading-none">
                  ACTL
                </span>
                <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase mt-0.5">
                  Associated Container Terminals Ltd
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Pill Buttons from actlindia.com Header (Visible on XL screens) */}
          <div className="hidden xl:flex items-center gap-2">
            {actlPills.map((pill, idx) => {
              const PillIcon = pill.icon;
              return (
                <button
                  key={idx}
                  onClick={pill.onClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-[#008DD2]/10 hover:bg-[#008DD2] text-[#008DD2] hover:text-white border border-[#008DD2]/30 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
                >
                  <PillIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* 📱 MOBILE: Clean Menu Toggle Button (Screen < lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Active Tab Name Pill */}
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-[#D8232A] rounded-xl border border-red-200 text-[11px] font-extrabold">
              <CurrentIcon className="w-3.5 h-3.5 text-[#008DD2]" />
              <span className="truncate max-w-[100px]">{currentItem.shortLabel}</span>
            </div>

            {/* Hamburger / Close Menu Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(prev => !prev);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D8232A] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white rounded-xl text-xs font-black shadow-sm active:scale-95 transition-all cursor-pointer border border-red-700 select-none"
              title="Open Navigation Menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-white shrink-0" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-white shrink-0" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>

          {/* 📱 Mobile Menu Dropdown Modal Drawer (Portaled / Fixed with Backdrop) */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              {/* Dimmed Backdrop */}
              <div 
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Modal Drawer */}
              <div 
                ref={menuRef}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-20 right-3 left-3 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-[101] animate-scale-in space-y-3.5 max-h-[calc(100vh-90px)] overflow-y-auto"
              >
                
                {/* 1. Admin Profile Header in Menu */}
                {currentUser && (
                  <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-900 via-[#1E293B] to-[#D8232A] rounded-2xl text-white shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center font-black text-xs text-white shrink-0">
                        <User className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">
                            {currentUser.name || 'ACTL Admin'}
                          </span>
                          <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            LIVE
                          </span>
                        </div>
                        <span className="text-xs text-slate-300 block font-medium">
                          {currentUser.badge || currentUser.role || 'ICD Operations'}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Quick Rake / Tariff Pills in Mobile */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {actlPills.map((pill, idx) => {
                    const PillIcon = pill.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          pill.onClick();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-1.5 p-2 rounded-xl text-[11px] font-black bg-sky-50 text-[#008DD2] border border-sky-200 hover:bg-[#008DD2] hover:text-white transition-colors text-left"
                      >
                        <PillIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{pill.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Admin User Management Button in Mobile Menu */}
                {isAdmin && onOpenUserManagement && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenUserManagement();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-slate-900 to-[#D8232A] text-white rounded-2xl text-xs font-black shadow-md cursor-pointer"
                  >
                    <User className="w-4 h-4 text-amber-300" />
                    <span>Manage User Access Logins</span>
                  </button>
                )}

                {/* 2. Navigation Modules List */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 py-0.5">
                    Select Dashboard Module
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer text-left ${
                          isActive 
                            ? 'bg-[#D8232A] text-white shadow-md' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                          <span className="text-xs font-black">{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 3. Logout / Sign Out Button inside Mobile Menu */}
                {currentUser && (
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-black bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out from Dashboard</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* 💻 DESKTOP: Navigation Tabs (Screen >= lg) */}
          <nav className="hidden lg:flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#D8232A] text-white shadow-md shadow-red-500/20'
                      : 'text-slate-700 hover:text-[#D8232A] hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 💻 DESKTOP Right Action: Admin User Profile & Sign Out (Screen >= lg) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAdmin && onOpenUserManagement && (
              <button
                onClick={onOpenUserManagement}
                className="px-3.5 py-2 bg-gradient-to-r from-slate-900 to-[#D8232A] hover:opacity-95 text-white rounded-xl text-xs font-black transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>User Access Logins</span>
              </button>
            )}

            {lastUpdated && (
              <span className="hidden 2xl:inline text-[11px] text-slate-400 font-bold tracking-tight">
                Updated: {lastUpdated}
              </span>
            )}

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              title="Force Refresh Data"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200 disabled:opacity-50"
            >
              <BarChart3 className={`w-4 h-4 ${loading ? 'animate-spin text-[#008DD2]' : ''}`} />
            </button>

            {/* User Profile Pill & Sign Out */}
            {currentUser && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-[#D8232A] font-black text-xs flex items-center justify-center shrink-0">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="text-left hidden xl:block">
                    <span className="text-xs font-black text-slate-800 block leading-tight">
                      {currentUser.name || 'ACTL User'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      {currentUser.badge || currentUser.role || 'ICD Faridabad'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
