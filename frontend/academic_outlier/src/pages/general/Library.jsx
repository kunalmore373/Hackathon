import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('uni_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (uniName) => {
    const updated = bookmarks.filter(b => b.name !== uniName);
    setBookmarks(updated);
    localStorage.setItem('uni_bookmarks', JSON.stringify(updated));
  };

  const filteredBookmarks = bookmarks.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-inter">
      <style>{`
        .text-editorial { letter-spacing: -0.02em; line-height: 1.2; }
        .shadow-ambient { box-shadow: 0 20px 40px rgba(0, 35, 111, 0.08); }
        .ghost-border { outline: 1px solid rgba(197, 197, 211, 0.2); }
      `}</style>

      {/* Top Navbar */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60 px-8 py-4 flex justify-between items-center w-full shadow-sm">
        <div className="flex items-center gap-8">
          <span onClick={() => navigate('/university')} className="text-xl font-bold text-[#00236f] tracking-tighter cursor-pointer">The Academic Atelier</span>
          <nav className="hidden md:flex gap-6">
            <a onClick={() => navigate('/dashboard')} className="text-slate-500 font-medium hover:text-[#00236f] transition-colors text-sm cursor-pointer" href="#">Dashboard</a>
            <a onClick={() => navigate('/university')} className="text-slate-500 font-medium hover:text-[#00236f] transition-colors text-sm cursor-pointer">Discovery</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-[#00236f]/20 w-64 transition-all" 
              placeholder="Search library..." 
            />
          </div>
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">notifications</button>
          <button className="material-symbols-outlined text-[#00236f] border-b-2 border-[#00236f] pb-1">bookmark</button>
          <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-slate-200">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxzcNamg9VsZswoTLc53UayazA_uac9ACA4k5ohWTMeju1ojjWFB9UiF39eXWFXHX_4O3VAqOUrgHL6W25wpySfOOnbUtZsU_lm-lDkXhm5blHBYm9jNRP29vTCa0J-EydI2d6F1KyFhgT2f6HLaPArDjaLdA4wYrxxlNA5uIo1vugvYmttygHUGXYEXwyEnSoqIPDDhKWx2VjBjy2TFY-6V_9TMPFNtYtkRxSRTT2WgX9GkIBNbMUTevullQ_xLJt0pSAg1JxukRo" alt="User" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 p-6 border-r border-slate-200 bg-white sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#00236f] flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#00236f]">Library</h2>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Saved Content</p>
              </div>
            </div>
          </div>
          
          <nav className="flex flex-col gap-1">
            <button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'All' ? 'bg-slate-50 text-[#00236f] shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmarks</span>
              <span>All Bookmarks</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[20px]">school</span>
              <span>Universities ({bookmarks.length})</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span>Scholarships</span>
            </button>
          </nav>

          <button className="mt-8 w-full py-3 px-4 bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add New Folder
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-[#00236f] text-editorial mb-2">Your Library</h1>
                <p className="text-slate-500 max-w-md text-sm font-medium">
                  Access your saved universities, scholarship opportunities, and essential academic reading in one unified space.
                </p>
              </div>
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl pl-12 pr-4 py-4 text-sm shadow-sm focus:ring-2 focus:ring-[#00236f]/10 ghost-border transition-all" 
                  placeholder="Search your library..." 
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-8 bg-slate-100 p-1 rounded-xl w-fit">
              {['All', 'Saved Universities', 'Scholarships'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-[#00236f] shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid Content */}
            {filteredBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBookmarks.map((uni, idx) => (
                  <div key={idx} className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-ambient transition-all group border border-slate-200/60">
                    {/* Background Watermark Initial */}
                    <div className="absolute -bottom-4 -right-2 text-slate-100 font-black text-9xl select-none pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity uppercase">
                      {uni.name[0]}
                    </div>

                    <div className="h-48 relative overflow-hidden bg-slate-200">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                        src={`https://images.unsplash.com/photo-1523050335456-c6bb7f9f632d?auto=format&fit=crop&w=800&q=80`} 
                        alt="Campus" 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800&q=80'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                      
                      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                        <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                          Saved Choice
                        </span>
                        <div className="flex items-center gap-1 text-white/80 text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">calendar_today</span>
                          Added Oct 12
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={() => removeBookmark(uni.name)}
                          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-red-500 transition-all shadow-xl border border-white/20"
                        >
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-[#00236f] tracking-tight line-clamp-1">{uni.name}</h3>
                      </div>
                      
                      <p className="text-xs text-slate-500 line-clamp-2 mb-6 font-semibold leading-relaxed">
                        A prestigious global institution recognized for academic excellence and pioneering research in {uni.country}.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-white/80">
                          <span className="material-symbols-outlined text-primary text-sm">public</span>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{uni.country}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-white/80">
                          <span className="material-symbols-outlined text-amber-500 text-sm">military_tech</span>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">Rank #{(uni.name.length * 7) % 500 + 1}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => uni.web_pages?.[0] && window.open(uni.web_pages[0], '_blank')}
                        className="w-full py-3 bg-[#00236f] text-white font-black rounded-xl text-xs hover:bg-[#1e3a8a] hover:shadow-lg hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                      >
                        Launch Official Portal
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-slate-400">library_add</span>
                </div>
                <h2 className="text-2xl font-bold text-[#00236f] mb-2">Your library is waiting.</h2>
                <p className="text-slate-500 max-w-sm mb-8 font-medium">
                  Start exploring universities and scholarships to build your curated collection of academic opportunities.
                </p>
                <button 
                  onClick={() => navigate('/university')}
                  className="px-8 py-4 bg-[#00236f] text-white rounded-2xl font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition-all"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* AI Copilot FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-[#00236f] text-white flex items-center justify-center shadow-ambient hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </button>
    </div>
  );
};

export default Library;
