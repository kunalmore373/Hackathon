import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & Reset
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('OTP has been sent to your email.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please check your email.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/auth/reset-password', { email, otp, newPassword });
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/user/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP or reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body min-h-screen flex antialiased">
            <style>{`
                .glass-copilot {
                    background: rgba(0, 35, 111, 0.85);
                    backdrop-filter: blur(12px);
                    box-shadow: 0 20px 40px rgba(0, 35, 111, 0.2);
                }
                .btn-primary-gradient {
                    background: linear-gradient(135deg, #00236f 0%, #1e3a8a 100%);
                }
                .ambient-shadow {
                    box-shadow: 0 20px 40px rgba(0, 35, 111, 0.08);
                }
            `}</style>

            {/* Left Panel */}
            <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-16">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full text-primary-container" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                    </svg>
                </div>
                <div className="relative z-10 text-left">
                    <h1 className="text-3xl font-black text-on-primary tracking-tight font-display mb-2">The Academic Atelier</h1>
                    <p className="text-primary-fixed font-headline text-lg tracking-wide">The Scholarly Canvas</p>
                </div>
                <div className="relative z-10 max-w-md text-left">
                    <h2 className="text-4xl font-bold text-on-primary font-display leading-tight tracking-tight mb-6">Regain Access to Your Workspace.</h2>
                    <p className="text-primary-fixed-dim text-lg leading-relaxed font-body">
                        A secure environment for elevated academic pursuit requires secure credentials. Let's get you back to your focused study session.
                    </p>
                </div>
                <div className="relative z-10 text-left">
                    <p className="text-primary-fixed-dim text-sm font-label uppercase tracking-widest">© 2024 The Academic Atelier</p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-surface-container-low relative">
                <div className="w-full max-w-md bg-surface-container-lowest p-10 rounded-2xl ambient-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-8">
                        <span className="material-symbols-outlined text-on-primary-fixed">lock_reset</span>
                    </div>

                    <div className="mb-10 text-left">
                        <h2 className="text-3xl font-bold text-primary font-display tracking-tight mb-3">
                            {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                        </h2>
                        <p className="text-on-surface-variant font-body leading-relaxed">
                            {step === 1 
                                ? "Enter your email address and we'll send you an OTP to reset your password." 
                                : "Enter the OTP sent to your email and choose a new secure password."}
                        </p>
                    </div>

                    {message && <p className="mb-6 text-sm text-green-600 bg-green-50 p-4 rounded-xl font-bold">{message}</p>}
                    {error && <p className="mb-6 text-sm text-red-600 bg-red-50 p-4 rounded-xl font-bold">{error}</p>}

                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="block text-xs font-semibold text-on-surface-variant font-label uppercase tracking-wider" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                                    <input 
                                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" 
                                        id="email" 
                                        type="email" 
                                        placeholder="scholar@university.edu" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <button 
                                disabled={loading}
                                className="w-full btn-primary-gradient text-on-primary font-semibold py-4 px-6 rounded-xl transition-all flex justify-center items-center gap-2"
                                type="submit"
                            >
                                <span>{loading ? 'Sending...' : 'Send OTP'}</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="block text-xs font-semibold text-on-surface-variant font-label uppercase tracking-wider" htmlFor="otp">Enter OTP</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">verified_user</span>
                                    <input 
                                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" 
                                        id="otp" 
                                        type="text" 
                                        placeholder="6-digit OTP" 
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="block text-xs font-semibold text-on-surface-variant font-label uppercase tracking-wider" htmlFor="password">New Password</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                                    <input 
                                        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <button 
                                disabled={loading}
                                className="w-full btn-primary-gradient text-on-primary font-semibold py-4 px-6 rounded-xl transition-all flex justify-center items-center gap-2"
                                type="submit"
                            >
                                <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-8">
                        <button 
                            onClick={() => navigate('/user/login')}
                            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <span>Back to Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
