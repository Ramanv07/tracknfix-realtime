import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  isVisible: boolean;
}

const WrenchIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22" 
        height="22" 
        fill="currentColor" 
        className="inline-block text-gray-700 mx-px" 
        viewBox="0 0 16 16"
        style={{ transform: 'translateY(-2px)' }}
        aria-hidden="true"
    >
        <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.342a3 3 0 1 0-4.242-4.241L2.223.102a3.004 3.004 0 0 0-2.121 2.121zm3.595.424a.5.5 0 0 1 .707 0l6.341 6.342a.5.5 0 0 1 0 .707l-2.121 2.122a.5.5 0 0 1-.707 0L5.897 9.512a.5.5 0 0 1 0-.707l-2.122-2.122a.5.5 0 0 1 0-.707z"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onLogoClick, isVisible }) => {
  return (
    <header className={`absolute top-0 left-0 right-0 z-20 h-16 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full bg-white/90 backdrop-blur-sm shadow-md flex items-center px-4">
            <button 
                onClick={onLogoClick} 
                className="flex items-center gap-1 text-3xl font-extrabold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg" 
                aria-label="Go to homepage"
            >
                <span className="tracking-tighter">track</span>
                <span className="text-orange-500">n</span>
                <span className="tracking-tighter flex items-center">
                    f<WrenchIcon />x
                </span>
            </button>
        </div>
    </header>
  );
};

export default Header;
