
import React, { useState, useCallback, useEffect, createContext, useContext, ReactNode } from 'react';
import { MOCK_USER, INITIAL_REPORTS } from './constants';
// Fix: 'ReportStatus' is an enum used as a value, so it cannot be a type-only import. Changed to a regular import.
import { User, Report, Notification, ReportStatus } from './types';
import MainApp from './components/MainApp';
import NotificationToast from './components/NotificationToast';
import LoginModal from './components/LoginModal';
import ProfileSetup from './components/ProfileSetup';
import LandingPage from './components/LandingPage';

interface AppContextType {
  user: User | null;
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'userId' | 'userName' | 'userProfilePicture' | 'votes' | 'votedBy' | 'createdAt' | 'status'>) => void;
  toggleVote: (reportId: string) => void;
  notifications: Notification[];
  isAuthenticated: boolean;
  requestLogin: () => void;
  updateUser: (userData: Partial<Omit<User, 'id'>>) => void;
  addFeedbackToReport: (reportId: string, feedback: { rating: number; comment: string }) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const LeafyBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-emerald-50">
    <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
    <div className="absolute bottom-[-50px] right-[-50px] w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
  </div>
);


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [showProfileSetup, setShowProfileSetup] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const addNotification = useCallback((message: string) => {
    const newNotification: Notification = { id: Date.now(), message };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
        const userReports = reports.filter(r => r.userId === user.id && r.status !== ReportStatus.Completed);
        if (userReports.length > 0) {
            const randomReport = userReports[Math.floor(Math.random() * userReports.length)];
            const currentStatusIndex = Object.values(ReportStatus).indexOf(randomReport.status);
            if (currentStatusIndex < Object.values(ReportStatus).length - 1) {
                const nextStatus = Object.values(ReportStatus)[currentStatusIndex + 1];
                setReports(prevReports =>
                    prevReports.map(r =>
                        r.id === randomReport.id ? { ...r, status: nextStatus } : r
                    )
                );
                addNotification(`Status of your report at ${randomReport.location.address} updated to "${nextStatus}"`);
            }
        }
    }, 15000); // Simulate admin update every 15 seconds

    return () => clearInterval(interval);
  }, [reports, user, addNotification]);


  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser(MOCK_USER);
    setIsLoginModalOpen(false);
    setTimeout(() => {
      setShowProfileSetup(true);
    }, 300);
  };
  
  const requestLogin = () => {
    setIsLoginModalOpen(true);
  };
  
  const updateUser = useCallback((userData: Partial<Omit<User, 'id'>>) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        return { ...prevUser, ...userData };
    });
  }, []);

  const handleProfileComplete = (updatedUserData: Omit<User, 'id'>) => {
    updateUser(updatedUserData);
    setShowProfileSetup(false);
  };

  const addReport = useCallback((newReportData: Omit<Report, 'id' | 'userId' | 'userName' | 'userProfilePicture' | 'votes' | 'votedBy' | 'createdAt' | 'status'>) => {
    if (!user) return;
    const newReport: Report = {
      ...newReportData,
      id: `report-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userProfilePicture: user.profilePicture,
      votes: 0,
      votedBy: [],
      createdAt: new Date(),
      status: ReportStatus.Reported,
    };
    setReports(prev => [newReport, ...prev]);
  }, [user]);

  const toggleVote = useCallback((reportId: string) => {
    if (!user) return;
    setReports(prev => prev.map(report => {
      if (report.id === reportId) {
        const hasVoted = report.votedBy.includes(user.id);
        if (hasVoted) {
          return {
            ...report,
            votes: report.votes - 1,
            votedBy: report.votedBy.filter(uid => uid !== user.id),
          };
        } else {
          return {
            ...report,
            votes: report.votes + 1,
            votedBy: [...report.votedBy, user.id],
          };
        }
      }
      return report;
    }));
  }, [user]);
  
  const addFeedbackToReport = useCallback((reportId: string, feedback: { rating: number; comment: string }) => {
    setReports(prev => prev.map(report => 
        report.id === reportId ? { ...report, feedback } : report
    ));
    addNotification('Thank you for your feedback!');
  }, [addNotification]);

  const appContextValue: AppContextType = {
    user,
    reports,
    addReport,
    toggleVote,
    notifications,
    isAuthenticated,
    requestLogin,
    updateUser,
    addFeedbackToReport
  };

  return (
    <AppContext.Provider value={appContextValue}>
        {isLoading && <LandingPage />}
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <LeafyBackground />
            <div className="font-sans antialiased text-gray-800">
                {isAuthenticated && showProfileSetup ? (
                <ProfileSetup onComplete={handleProfileComplete} />
                ) : (
                <MainApp />
                )}
                
                {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setIsLoginModalOpen(false)} />}
                
                <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                    {notifications.map(n => (
                        <NotificationToast key={n.id} message={n.message} />
                    ))}
                </div>
            </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;