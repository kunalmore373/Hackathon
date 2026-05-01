import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import axios from 'axios';

// Sub-component for individual University Cards
const UniversityCard = ({ uni, isBookmarked, onBookmark }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [wikiData, setWikiData] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const hoverTimer = useRef(null);

  // Determine institution type and mock stats for UI richness
  const isTech = uni.name?.toLowerCase().includes('tech') || uni.name?.toLowerCase().includes('science');
  const mockRank = (uni.name.length * 7) % 500 + 1;
  const mockFees = (uni.name.length % 3 === 0) ? "£32k - £45k/yr" : "£24k - £38k/yr";
  const mockIntake = (uni.name.length % 2 === 0) ? "Sep / Jan" : "Sep";
  const mockDuration = (uni.name.length % 2 === 0) ? "3 - 4 Years" : "1 Year";

  const fetchWikiData = async () => {
    if (wikiData) return;
    setLoadingWiki(true);
    try {
      const searchName = uni.name.replace(/ /g, '_');
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchName)}`);
      setWikiData(response.data);
    } catch (error) {
      setWikiData({ extract: "This prestigious global institution is recognized for its academic excellence, cutting-edge research, and diverse student body." });
    } finally {
      setLoadingWiki(false);
    }
  };

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsFlipped(true);
      fetchWikiData();
    }, 400); 
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsFlipped(false);
  };

  const cancelFlip = (e) => {
    e.stopPropagation();
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <div 
      className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front bg-white dark:bg-slate-900 rounded-2xl p-6 flex flex-col gap-4 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
          <div className="flex justify-between items-start z-20" onMouseEnter={cancelFlip}>
            <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200/50">
              <div className="text-primary font-black text-xl uppercase">{uni.name ? uni.name[0] : 'U'}</div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onBookmark(uni); }}
                onMouseEnter={cancelFlip}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isBookmarked ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "" }}>bookmark</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              {uni.name}
              {uni.alpha_two_code && (
                <img src={`https://flagcdn.com/w20/${uni.alpha_two_code.toLowerCase()}.png`} className="w-4 h-3 rounded-sm opacity-80" alt="Flag" />
              )}
            </h4>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {uni['state-province'] ? `${uni['state-province']}, ` : ''}{uni.country}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 py-1">
            <span className="px-2 py-1 rounded bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wide">Top 1% Global</span>
            <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide">{isTech ? 'Elite Tech' : 'Elite Research'}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mt-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Avg. Fees</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{mockFees}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Intake</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{mockIntake}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{mockDuration}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">QS Rank</span>
              <span className="text-xs font-bold text-primary">#{mockRank} Global</span>
            </div>
          </div>

          <button 
            onClick={() => uni.web_pages?.[0] && window.open(uni.web_pages[0], '_blank')}
            className="w-full py-3 mt-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-primary hover:text-white transition-all"
          >
            View Details
          </button>
        </div>

        {/* Back Side (Wikipedia Summary) */}
        <div className="flip-card-back bg-slate-900 text-white rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-slate-700">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="material-symbols-outlined text-amber-400">info</span>
            <h4 className="text-sm font-bold uppercase tracking-widest">Institution Bio</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {loadingWiki ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-[10px] opacity-60">Fetching Wikipedia...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs leading-relaxed opacity-90">
                  {wikiData?.extract || "No detailed summary found."}
                </p>
                {wikiData?.thumbnail && (
                  <img src={wikiData.thumbnail.source} className="w-full h-32 object-cover rounded-xl shadow-lg border border-white/5" alt="Campus" />
                )}
              </div>
            )}
          </div>

          <button 
            onClick={() => uni.web_pages?.[0] && window.open(uni.web_pages[0], '_blank')}
            className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
          >
            Visit Website
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const University = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState(['United Kingdom']);
  const [studyLevel, setStudyLevel] = useState('Postgraduate');
  const [subjectArea, setSubjectArea] = useState('All Subjects');
  const [sortBy, setSortBy] = useState('ranking');
  const [spotlightUni, setSpotlightUni] = useState(null);
  const [spotlightWiki, setSpotlightWiki] = useState("");
  const [spotlightImg, setSpotlightImg] = useState("");
  
  // Bookmark state with LocalStorage persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('uni_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('uni_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (uni) => {
    setBookmarks(prev => {
      const isExist = prev.some(item => item.name === uni.name);
      if (isExist) return prev.filter(item => item.name !== uni.name);
      return [...prev, uni];
    });
  };

  // Expanded menu open states
  const [openMenus, setOpenMenus] = useState({
    destination: true,
    studyLevel: false,
    subjectArea: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Fetch Spotlight Wikipedia Data & Image
  useEffect(() => {
    const fetchSpotlightData = async () => {
      if (!spotlightUni) return;
      try {
        const name = spotlightUni.name.replace(/ /g, '_');
        const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
        setSpotlightWiki(res.data.extract);
        // Use high-res image if available, otherwise thumbnail
        setSpotlightImg(res.data.originalimage?.source || res.data.thumbnail?.source || "");
      } catch (e) {
        setSpotlightWiki("A globally recognized institution committed to pioneering research and academic excellence.");
        setSpotlightImg("");
      }
    };
    fetchSpotlightData();
  }, [spotlightUni]);

  useEffect(() => {
    const fetchUniversities = async () => {
      if (selectedCountries.length === 0) {
        setUniversities([]);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get('/universities', {
          params: {
            country: selectedCountries.join(','),
            search: searchQuery.trim()
          }
        });
        
        let filtered = response.data;
        
        if (subjectArea !== 'All Subjects') {
          filtered = filtered.filter(u => u.name.toLowerCase().includes(subjectArea.toLowerCase()));
        }

        filtered.sort((a, b) => {
          if (sortBy === 'ranking') {
            const rankA = (a.name.length * 7) % 500 + 1;
            const rankB = (b.name.length * 7) % 500 + 1;
            return rankA - rankB;
          }
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'country') return a.country.localeCompare(b.country);
          return 0;
        });

        setUniversities(filtered); 
        if (filtered.length > 0) {
          setSpotlightUni(filtered[0]);
        }
      } catch (error) {
        console.error('Error fetching:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchUniversities();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCountries, studyLevel, subjectArea, sortBy]);

  const toggleCountry = (country) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country) 
        : [...prev, country]
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-inter">
      <style>{`
        .bg-gradient-primary { background: linear-gradient(135deg, #00236f 0%, #1e3a8a 100%); }
        .flip-card-container { perspective: 1000px; height: 440px; width: 100%; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
        .flipped .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; }
        .flip-card-back { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
      
      {/* Navbar */}
      <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div onClick={() => navigate('/university')} className="text-xl font-black tracking-tight text-primary cursor-pointer">Academic Atelier</div>
          <div className="hidden md:flex gap-8 items-center text-sm font-bold">
            <a onClick={() => navigate('/dashboard')} className="text-slate-500 hover:text-primary cursor-pointer transition-colors" href="#">Dashboard</a>
            <a onClick={() => navigate('/university')} className="text-primary border-b-2 border-primary pb-1 cursor-pointer">Discovery</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer">notifications</span>
          <div onClick={() => navigate('/library')} className="relative cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-slate-400">bookmark</span>
            {bookmarks.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {bookmarks.length}
              </div>
            )}
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCntMRFmijrYRatvk342Z1gi2OPtUVojwlOT8E790lwvg7zX8gVp992WHCfaR83Hk7d5z3hMUCz2L4CMaSvDFevkOJLhcvMp16bD-qgHa496n3GAdxU6hziyltkY9FfEozyWvHpmKUwTKMN9urqJPKLdVeWad_cZHs_KOlNeIERo2ilDRxlvFoHpdAhLa6c9ayqwT_bVNdN-DBwttHl6-ta8IGqUiK6TFCVpdmW26d2D46pFa7FOMoCzg01sDSYsNci6Wvhf-10sS-S" alt="User" />
          </div>
        </div>
      </nav>

      <main className="flex flex-1 w-full max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 p-6 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-72px)] sticky top-[72px] overflow-y-auto bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Discovery Filters</h2>
          </div>

          <div className="space-y-4">
            {/* Destination Accordion */}
            <div className="flex flex-col">
              <div 
                onClick={() => toggleMenu('destination')}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">public</span>
                  <span className="text-xs font-black uppercase">Destination</span>
                </div>
                <span className={`material-symbols-outlined text-slate-400 transition-transform ${openMenus.destination ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              {openMenus.destination && (
                <div className="flex flex-col gap-1 px-4 pb-2">
                  {['India', 'United Kingdom', 'United States', 'Canada', 'Germany'].map(country => (
                    <button 
                      key={country}
                      onClick={() => toggleCountry(country)}
                      className={`text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedCountries.includes(country) ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Study Level Accordion */}
            <div className="flex flex-col">
              <div 
                onClick={() => toggleMenu('studyLevel')}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">school</span>
                  <span className="text-xs font-black uppercase">Study Level</span>
                </div>
                <span className={`material-symbols-outlined text-slate-400 transition-transform ${openMenus.studyLevel ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              {openMenus.studyLevel && (
                <div className="flex flex-col gap-1 px-4 pb-2">
                  {['Undergraduate', 'Postgraduate', 'PhD', 'Diploma'].map(level => (
                    <button 
                      key={level}
                      onClick={() => setStudyLevel(level)}
                      className={`text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${studyLevel === level ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subject Area Accordion */}
            <div className="flex flex-col">
              <div 
                onClick={() => toggleMenu('subjectArea')}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">menu_book</span>
                  <span className="text-xs font-black uppercase">Subject Area</span>
                </div>
                <span className={`material-symbols-outlined text-slate-400 transition-transform ${openMenus.subjectArea ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              {openMenus.subjectArea && (
                <div className="flex flex-col gap-1 px-4 pb-2">
                  {['All Subjects', 'Engineering', 'Business', 'Science', 'Arts'].map(area => (
                    <button 
                      key={area}
                      onClick={() => setSubjectArea(area)}
                      className={`text-left px-4 py-2 rounded-lg text-xs font-bold transition-all ${subjectArea === area ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-6 space-y-3">
            <button 
              onClick={() => {
                setSelectedCountries(['United Kingdom']);
                setStudyLevel('Postgraduate');
                setSubjectArea('All Subjects');
                setSearchQuery('');
              }}
              className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black text-sm hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Active Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-widest">Active Filters:</span>
              {selectedCountries.map(c => (
                <div key={c} className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold flex items-center gap-2 shadow-sm">
                  {c} <span onClick={() => toggleCountry(c)} className="material-symbols-outlined text-[14px] text-slate-400 cursor-pointer hover:text-error">close</span>
                </div>
              ))}
              <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold flex items-center gap-2 shadow-sm">
                {studyLevel} <span className="material-symbols-outlined text-[14px] text-slate-400">close</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm min-w-[240px]">
              <span className="material-symbols-outlined text-slate-400">sort</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold bg-transparent border-none outline-none cursor-pointer w-full"
              >
                <option value="ranking">Sort By: Global Ranking</option>
                <option value="name">Sort By: Name (A-Z)</option>
                <option value="country">Sort By: Country</option>
              </select>
            </div>
          </div>

          {/* Spotlight */}
          {spotlightUni && (
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-800">
              {/* Secondary Safety Gradient Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-950"></div>
              
              <img 
                src={spotlightImg || `https://images.unsplash.com/photo-1523050335456-c6bb7f9f632d?auto=format&fit=crop&w=1600&q=80`} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 mix-blend-overlay" 
                alt="Campus"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1350&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-4 w-fit shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  Top Recommendation
                </div>
                <h1 className="text-5xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">{spotlightUni.name}</h1>
                <p className="text-slate-200 max-w-2xl text-lg font-medium leading-relaxed mb-8 line-clamp-2 drop-shadow-md">
                  {spotlightWiki || "A globally recognized institution committed to pioneering research and academic excellence."}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => spotlightUni.web_pages?.[0] && window.open(spotlightUni.web_pages[0], '_blank')}
                    className="px-8 py-3 bg-white text-primary font-black rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    Apply Now
                  </button>
                  <button 
                    onClick={() => spotlightUni.web_pages?.[0] && window.open(spotlightUni.web_pages[0], '_blank')}
                    className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined">public</span>
                    Official Portal
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recommended Institutions</h3>
            <p className="text-slate-400 text-sm font-medium">Showing {universities.length} matches based on your profile</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {universities.map((uni, idx) => (
                <UniversityCard 
                  key={idx} 
                  uni={uni} 
                  isBookmarked={bookmarks.some(b => b.name === uni.name)}
                  onBookmark={toggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default University;
