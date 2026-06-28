import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-emerald-50 flex flex-col items-center justify-center z-50 text-center">
            <div>
                <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <span>Track</span><span className="text-orange-500">N</span><span>Fix</span>
                </h1>
                <p className="mt-4 text-2xl text-gray-800 font-light tracking-wide">
                    <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.8s' }}>Snap it!</span>
                    <span className="inline-block animate-fadeInUp ml-2" style={{ animationDelay: '1s' }}>Fix it!</span>
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
