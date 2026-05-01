import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const isOnboarded = params.get('onboarded') === 'true';

        if (token) {
            localStorage.setItem('token', token);
            
            if (isOnboarded) {
                navigate('/dashboard');
            } else {
                navigate('/user/onboarding');
            }
        } else {
            navigate('/user/login');
        }
    }, [navigate, location]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-on-surface-variant font-medium">Authenticating your session...</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
