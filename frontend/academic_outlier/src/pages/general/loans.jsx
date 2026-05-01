import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios';
import { 
    ComposedChart, 
    Bar, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip as RechartsTooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const Loans = () => {
    const [user, setUser] = useState(null);
    const [loanAmount, setLoanAmount] = useState(45000);
    const [tenure, setTenure] = useState(10);
    const [interestRate, setInterestRate] = useState(8.5);
    const [emi, setEmi] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/me');
                setUser(response.data.user);
                if (response.data.user?.profile?.annualBudget) {
                    setLoanAmount(response.data.user.profile.annualBudget * 2);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const p = loanAmount;
        const r = (interestRate / 12) / 100;
        const n = tenure * 12;
        
        if (r === 0) {
            setEmi(p / n);
            setTotalCost(p);
        } else {
            const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setEmi(Math.round(emiVal));
            setTotalCost(Math.round(emiVal * n));
        }
    }, [loanAmount, tenure, interestRate]);

    const breakEven = Math.round((totalCost / 25000) * 10) / 10;

    // Chart Data Generation
    const roiData = useMemo(() => {
        const annualSalary = 75000;
        const netSavingsPotential = annualSalary * 0.45; // 45% potential savings/debt repayment
        const annualEMI = emi * 12;

        return [1, 2, 3, 4, 5].map(year => ({
            year: `Year ${year}`,
            repayment: annualEMI,
            savings: Math.max(0, netSavingsPotential - annualEMI),
            cumulative: Math.max(0, (netSavingsPotential * year) - (annualEMI * year))
        }));
    }, [emi]);

    const allocationData = [
        { name: 'Tuition', value: loanAmount * 0.65, color: '#00236f' },
        { name: 'Living', value: loanAmount * 0.25, color: '#1e3a8a' },
        { name: 'Tech', value: loanAmount * 0.10, color: '#3b82f6' },
    ];

    return (
        <div className="bg-background text-on-surface antialiased min-h-screen flex font-body">
            <style>{`
        .bg-gradient-primary { background: linear-gradient(135deg, #00236f, #1e3a8a); }
        .glass-copilot {
            background-color: rgba(0, 35, 111, 0.9);
            backdrop-filter: blur(12px);
            box-shadow: 0 20px 40px rgba(0, 35, 111, 0.2);
        }
        .recharts-default-tooltip {
            background-color: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>

            {/* SideNavBar */}
            <nav className="bg-[#f2f4f6] dark:bg-slate-900 text-[#00236f] dark:text-blue-400 text-sm font-medium tracking-wide fixed left-0 top-0 h-full flex flex-col pt-20 pb-8 px-4 w-64 z-50 font-inter">
                <div className="mb-10 px-4">
                    <h1 className="text-lg font-black text-[#00236f] dark:text-blue-300 tracking-tighter">Student Portal</h1>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Elite Financial Hub</p>
                </div>
                <ul className="flex flex-col space-y-2 flex-grow">
                    <li>
                        <a className="flex items-center space-x-4 px-4 py-3 text-[#444651] dark:text-slate-400 hover:translate-x-1 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 ease-in-out transform rounded-r-full" href="/dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center space-x-4 px-4 py-3 text-[#444651] dark:text-slate-400 hover:translate-x-1 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 ease-in-out transform rounded-r-full" href="/university">
                            <span className="material-symbols-outlined">school</span>
                            <span>Universities</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center space-x-4 px-4 py-3 text-[#444651] dark:text-slate-400 hover:translate-x-1 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 ease-in-out transform rounded-r-full" href="#">
                            <span className="material-symbols-outlined">description</span>
                            <span>Documents</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center space-x-4 px-4 py-3 bg-white dark:bg-slate-800 text-[#00236f] dark:text-blue-300 rounded-l-full font-semibold shadow-sm ease-in-out transform" href="/loans">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                            <span>Loans</span>
                        </a>
                    </li>
                    <li className="mt-auto pt-8">
                        <a className="flex items-center space-x-4 px-4 py-3 text-[#444651] dark:text-slate-400 hover:translate-x-1 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 ease-in-out transform rounded-r-full" href="#">
                            <span className="material-symbols-outlined">settings</span>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
                <div className="mt-6 px-4">
                    <button className="w-full bg-gradient-primary text-on-primary font-bold py-3 px-4 rounded-lg hover:saturate-150 focus:outline-none focus:ring-2 focus:ring-surface-tint focus:ring-offset-2 transition-all shadow-md">
                        Apply for Loan
                    </button>
                </div>
            </nav>

            <main className="ml-64 flex-1 p-12 bg-background min-h-screen">
                <header className="mb-12">
                    <h2 className="text-4xl font-black text-primary tracking-tight mb-2 text-left uppercase">Financial Planner</h2>
                    <p className="text-on-surface-variant text-lg text-left">Visualize your ROI and optimize your academic investment.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Simulation */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">tune</span>
                                <h3 className="text-2xl font-bold text-primary">Simulation Controls</h3>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                                        <span className="text-lg font-black text-primary">${loanAmount.toLocaleString()}</span>
                                    </div>
                                    <input 
                                        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary" 
                                        type="range" min="10000" max="300000" step="5000" value={loanAmount} 
                                        onChange={(e) => setLoanAmount(Number(e.target.value))} 
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="flex justify-between mb-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tenure</label>
                                            <span className="text-lg font-black text-primary">{tenure} Yrs</span>
                                        </div>
                                        <input 
                                            className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary" 
                                            type="range" min="1" max="25" value={tenure} 
                                            onChange={(e) => setTenure(Number(e.target.value))} 
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-3">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ROI (%)</label>
                                            <span className="text-lg font-black text-primary">{interestRate}%</span>
                                        </div>
                                        <input 
                                            className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary" 
                                            type="range" min="5" max="15" step="0.5" value={interestRate} 
                                            onChange={(e) => setInterestRate(Number(e.target.value))} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <span className="material-symbols-outlined text-primary text-3xl">insights</span>
                                    <h3 className="text-2xl font-bold text-primary">ROI Projection</h3>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#00236f]"></div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">EMI</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Savings</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={roiData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="year" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                                            dy={10}
                                        />
                                        <YAxis hide />
                                        <RechartsTooltip cursor={{ fill: '#f8fafc' }} />
                                        <Bar dataKey="repayment" barSize={40} fill="#00236f" radius={[4, 4, 0, 0]} />
                                        <Area type="monotone" dataKey="savings" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Break-even Point</p>
                                    <p className="text-2xl font-black text-[#00236f]">{breakEven} Years</p>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-left">
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Monthly EMI</p>
                                    <p className="text-2xl font-black text-[#00236f]">${emi.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Allocation & Docs */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                             <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-8 text-left">Fund Allocation</h3>
                             <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={allocationData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            {allocationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="space-y-4 mt-4">
                                {allocationData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-primary">${item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                             </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                             <h3 className="text-lg font-bold mb-2 text-left leading-tight">Ready to Secure Your Future?</h3>
                             <p className="text-xs text-slate-400 mb-8 text-left leading-relaxed">Start your application now and get pre-approval within 24 hours with our AI-assisted documentation flow.</p>
                             <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all">
                                 Begin Application Flow
                             </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Loans;
