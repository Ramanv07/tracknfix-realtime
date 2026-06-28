
import React, { useState } from 'react';

interface LoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

const LoginSuccessAnimation = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 52 52">
          <circle className="text-gray-200" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
          <path className="text-emerald-500 origin-center transform animate-stroke" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-800">Login Successful!</h3>
      <p className="text-gray-600">Redirecting...</p>
    </div>
);

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginSuccess(true);
    setTimeout(() => {
        onLogin();
    }, 1500); // Wait for animation
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 animate-fadeIn" 
        onClick={!isLoginSuccess ? onClose : undefined}
    >
        <div 
            className="relative w-full max-w-sm mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl"
            onClick={e => e.stopPropagation()}
        >
            {isLoginSuccess ? (
                <LoginSuccessAnimation />
            ) : (
                <>
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" aria-label="Close modal">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-emerald-700 drop-shadow-lg mb-2">
                            TrackNFix
                        </h1>
                        <h2 className="text-xl font-bold text-gray-700 mb-6">Login to Continue</h2>
                    </div>
                    {!otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 bg-gray-700/80 text-white placeholder-gray-300 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
                        >
                          Send OTP
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <p className="text-sm text-gray-600 text-center">Enter OTP sent to {phone}</p>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="w-full px-4 py-3 bg-gray-700/80 text-white placeholder-gray-300 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                          maxLength={6}
                        />
                        <button
                          type="submit"
                          className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
                        >
                          Verify & Login
                        </button>
                      </form>
                    )}
                </>
            )}
        </div>
    </div>
  );
};

export default LoginModal;
