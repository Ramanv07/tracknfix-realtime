
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { User } from '../types';

interface ProfileSetupProps {
  onComplete: (userData: Omit<User, 'id'>) => void;
}

const UserIcon = ({ className }: { className:string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = ({ className }: { className:string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CameraIcon = ({ className }: { className: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const { user } = useAppContext();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || `https://i.pravatar.cc/150?u=${user?.id || 'default'}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ name, email, profilePicture });
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to TrackNFix!</h1>
        <p className="text-gray-600 mb-8">Let's set up your profile.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative w-28 h-28 mx-auto">
            <img src={profilePicture} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-lg" />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              aria-label="Change profile picture"
            >
              <CameraIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-600 transition-colors transform hover:-translate-y-0.5"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
