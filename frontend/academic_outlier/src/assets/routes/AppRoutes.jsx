import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../../components/Layout';

const Register = lazy(() => import('../../pages/auth/userRegister'));
const Login = lazy(() => import('../../pages/auth/userLogin'));
const OtpVerification = lazy(() => import('../../pages/auth/otpVerification'));
const Onboarding = lazy(() => import('../../pages/auth/onboarding'));
const AuthSuccess = lazy(() => import('../../pages/auth/AuthSuccess'));
const Home = lazy(() => import('../../pages/general/home'));
const StudentDashboard = lazy(() => import('../../pages/general/studentDashboard'));
const University = lazy(() => import('../../pages/general/university'));
const Loans = lazy(() => import('../../pages/general/loans'));
const Library = lazy(() => import('../../pages/general/Library'));
const Profile = lazy(() => import('../../pages/general/profile'));
const ForgotPassword = lazy(() => import('../../pages/auth/ForgotPassword'));

const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
                    <Routes>
                        <Route path="/user/register" element={<Register />} />
                        <Route path="/user/login" element={<Login />} />
                        <Route path="/user/forgot-password" element={<ForgotPassword />} />
                        <Route path="/auth-success" element={<AuthSuccess />} />
                        <Route path="/user/otp" element={<OtpVerification />} />
                        <Route path="/user/onboarding" element={<Onboarding />} />
                        <Route path="/dashboard" element={<StudentDashboard />} />
                        <Route path="/university" element={<University />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/loans" element={<Loans />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
};

export default AppRoutes;