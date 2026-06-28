
import React, { useState, useMemo, ChangeEvent, useRef, useEffect } from 'react';
import { useAppContext } from '../App';
import { Report, ReportCategory, ActiveTab, ReportStatus } from '../types';
import Header from './Header';

// Icons defined locally for simplicity
const HomeIcon = ({ className }: { className: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const CameraIcon = ({ className }: { className: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UserIcon = ({ className }: { className:string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const StatusIcon = ({ className }: { className: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HeartIcon = ({ className, solid }: { className: string, solid?: boolean }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={solid ? "currentColor" : "none"} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const LocationIcon = ({ className }: { className: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const WaterIcon = ({ className }: { className: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C8.686 22 6 19.314 6 16C6 12 12 2 12 2S18 12 18 16C18 19.314 15.314 22 12 22Z" /></svg>;
const LightIcon = ({ className }: { className: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21a7 7 0 100-14 7 7 0 000 14z" /></svg>;
const GarbageIcon = ({ className }: { className: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const RoadIcon = ({ className }: { className: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-12l-8 8-8-8" /></svg>;
const OtherIcon = ({ className }: { className: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const StarIcon = ({ className, solid }: { className: string, solid?: boolean }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={solid ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;


// Sub-components
const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const { user, toggleVote, isAuthenticated, requestLogin } = useAppContext();
    const [isAnimating, setIsAnimating] = useState(false);
    const isVoted = user ? report.votedBy.includes(user.id) : false;

    const handleVoteClick = () => {
        if (!isAuthenticated) {
            requestLogin();
            return;
        }
        toggleVote(report.id);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const categoryStyles = {
        [ReportCategory.Water]: 'border-blue-500 text-blue-600',
        [ReportCategory.Light]: 'border-yellow-500 text-yellow-600',
        [ReportCategory.Garbage]: 'border-green-500 text-green-600',
        [ReportCategory.Road]: 'border-gray-500 text-gray-600',
        [ReportCategory.Other]: 'border-purple-500 text-purple-600',
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-4 flex items-center gap-3">
                <img src={report.userProfilePicture} alt={report.userName} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-bold text-gray-800">{report.userName}</p>
                    <p className="text-xs text-gray-500">{report.createdAt.toLocaleDateString()}</p>
                </div>
            </div>
            <img src={report.image} alt="Report" className="w-full h-64 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-white border-2 ${categoryStyles[report.category]}`}>{report.category}</span>
                    <div className="flex items-center gap-2">
                        <button onClick={handleVoteClick} className="focus:outline-none">
                            <HeartIcon solid={isVoted} className={`w-8 h-8 ${isVoted ? 'text-red-500' : 'text-gray-400'} transition-transform duration-300 ${isAnimating ? 'transform scale-150' : 'transform scale-100'}`} />
                        </button>
                        <span className="font-bold text-gray-700">{report.votes}</span>
                    </div>
                </div>
                <p className="text-gray-700 mb-2 bg-white">{report.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <LocationIcon className="w-4 h-4 mr-1" />
                    <span>{report.location.address}</span>
                </div>
            </div>
        </div>
    );
};

const Spinner = () => <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>;

const HomeFeed = () => {
    const { reports } = useAppContext();
    return <div className="p-4">{reports.map(report => <ReportCard key={report.id} report={report} />)}</div>;
};

const ReportIssue = ({ onReportSubmitted }: { onReportSubmitted: () => void }) => {
    const { addReport } = useAppContext();
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<ReportCategory | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [location, setLocation] = useState<{ address: string } | null>(null);
    const [locationMessage, setLocationMessage] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const CATEGORIES = [
        { name: ReportCategory.Water, icon: WaterIcon, color: 'text-blue-500' },
        { name: ReportCategory.Light, icon: LightIcon, color: 'text-yellow-500' },
        { name: ReportCategory.Garbage, icon: GarbageIcon, color: 'text-green-500' },
        { name: ReportCategory.Road, icon: RoadIcon, color: 'text-gray-500' },
        { name: ReportCategory.Other, icon: OtherIcon, color: 'text-purple-500' },
    ];

    useEffect(() => {
        let stream: MediaStream | null = null;
        if (isCameraOpen) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(s => {
                    stream = s;
                    if (videoRef.current) videoRef.current.srcObject = stream;
                })
                .catch(err => {
                    console.error("Error accessing camera: ", err);
                    alert("Could not access camera. Please check permissions.");
                    setIsCameraOpen(false);
                });
        }
        return () => stream?.getTracks().forEach(track => track.stop());
    }, [isCameraOpen]);

    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        setIsCapturing(true);

        const video = videoRef.current, canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        setImage(canvas.toDataURL('image/jpeg'));

        setLocation(null);
        setLocationMessage('Fetching location...');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const addr = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
                setLocation({ address: addr });
                setLocationMessage(`Location captured: ${addr}`);
            },
            () => {
                setLocationMessage('Location permission denied. Please enable it in your browser settings.');
            }
        );
        setTimeout(() => { setIsCapturing(false); setIsCameraOpen(false); }, 200);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !description || !location || !category) return;

        setIsSubmitting(true);
        setTimeout(() => {
            addReport({ image, description, category, location });
            setIsSubmitting(false);
            setImage(null);
            setLocation(null);
            setDescription('');
            setCategory(null);
            setLocationMessage('');
            onReportSubmitted();
        }, 1500);
    };

    if (isCameraOpen) {
        return (
            <div className="absolute inset-0 bg-black flex flex-col z-20">
                <div className="relative flex-grow w-full h-full">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    {isCapturing && <div className="absolute inset-0 bg-white opacity-80 animate-ping"></div>}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 flex justify-center items-center">
                    <button onClick={handleCapture} className="w-16 h-16 bg-white rounded-full border-4 border-white/50 shadow-lg transform hover:scale-110 transition-transform focus:outline-none" aria-label="Capture photo"></button>
                </div>
                <button onClick={() => setIsCameraOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full py-2 px-4 text-sm font-bold" aria-label="Close camera">Close</button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-t-3xl h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Report an Issue</h2>
            {!image ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="text-gray-600 mb-4">Take a picture of the issue to get started.</p>
                    <button onClick={() => setIsCameraOpen(true)} className="w-full max-w-xs flex items-center justify-center gap-3 bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-emerald-600 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                        <CameraIcon className="w-6 h-6" /><span>Open Camera</span>
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Photo Preview</label>
                            <div className="relative">
                                <img src={image} alt="Report preview" className="w-full rounded-lg shadow-md" />
                                <button type="button" onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white text-xs font-bold py-1 px-2 rounded-full hover:bg-black/70">Retake</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <p className={`mt-1 p-2 rounded-md text-sm ${location ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800 animate-pulse'}`}>{locationMessage}</p>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue..." className="mt-1 block w-full rounded-lg border-gray-300 bg-white p-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-150" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="grid grid-cols-3 gap-2">
                                {CATEGORIES.map(({ name, icon: Icon, color }) => (
                                    <button key={name} type="button" onClick={() => setCategory(name)} className={`p-2 border rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all ${category === name ? 'bg-emerald-500 text-white ring-2 ring-emerald-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                        <Icon className={`w-6 h-6 mb-1 ${category !== name && color}`} />
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <button type="submit" disabled={isSubmitting || !location || !category || !description} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 transform hover:-translate-y-0.5 disabled:transform-none">
                            {isSubmitting ? <Spinner /> : 'Submit Report'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;
        const duration = 1000;
        const startTime = performance.now();
        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const current = Math.floor(progress * end);
            setDisplayValue(current);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [value]);
    return <span className="text-3xl font-bold text-emerald-600">{displayValue}</span>;
};

const StatusLine = ({ isActive }: { isActive: boolean }) => {
    const [width, setWidth] = useState('0%');

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(isActive ? '100%' : '0%');
        }, 100);
        return () => clearTimeout(timer);
    }, [isActive]);

    return (
        <div className="flex-1 h-1 mx-2 bg-gray-300 rounded-full">
            <div
                className="h-full bg-emerald-500 rounded-full transition-all ease-out duration-1000"
                style={{ width }}
            />
        </div>
    );
};

const StatusTracker = ({ status }: { status: ReportStatus }) => {
    const statuses = Object.values(ReportStatus);
    const currentIndex = statuses.indexOf(status);

    return (
        <div className="flex items-center w-full my-4">
            {statuses.map((s, index) => (
                <React.Fragment key={s}>
                    <div className="flex flex-col items-center z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${index <= currentIndex ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                            {index <= currentIndex && (
                                <svg className="w-4 h-4 text-white animate-fadeIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <p className={`mt-1 text-xs text-center font-semibold transition-colors w-16 leading-tight ${index <= currentIndex ? 'text-emerald-600' : 'text-gray-500'}`}>{s}</p>
                    </div>
                    {index < statuses.length - 1 && (
                        <StatusLine isActive={index < currentIndex} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const ReportDetailModal = ({ report, onClose }: { report: Report, onClose: () => void }) => {
    const { addFeedbackToReport } = useAppContext();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;
        setIsSubmittingFeedback(true);
        setTimeout(() => {
            addFeedbackToReport(report.id, { rating, comment });
            setIsSubmittingFeedback(false);
            onClose();
        }, 1000);
    };

    const categoryStyles = {
        [ReportCategory.Water]: 'border-blue-500 text-blue-600',
        [ReportCategory.Light]: 'border-yellow-500 text-yellow-600',
        [ReportCategory.Garbage]: 'border-green-500 text-green-600',
        [ReportCategory.Road]: 'border-gray-500 text-gray-600',
        [ReportCategory.Other]: 'border-purple-500 text-purple-600',
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 animate-fadeIn" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Report Details</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    
                    <img src={report.image} alt="Report" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                    
                    <p className="text-gray-700 mb-4 bg-white p-3 rounded-lg">{report.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="bg-white p-3 rounded-lg">
                            <span className="font-semibold text-gray-800 block">Category</span>
                            <span className={`text-xs font-semibold px-2 py-1 mt-1 inline-block rounded-full bg-white border-2 ${categoryStyles[report.category]}`}>{report.category}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <span className="font-semibold text-gray-800 block">Location</span>
                            {report.location.address}
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <span className="font-semibold text-gray-800 block">Date Reported</span>
                            {report.createdAt.toLocaleDateString()}
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <span className="font-semibold text-gray-800 block">Votes</span>
                            {report.votes}
                        </div>
                    </div>

                    <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">Current Status</h3>
                    <div className="bg-white p-4 rounded-lg">
                        <StatusTracker status={report.status} />
                    </div>

                    {report.status === ReportStatus.Completed && (
                        <div className="mt-6 animate-fadeIn">
                            <h3 className="text-md font-semibold text-gray-800 mb-2">Feedback</h3>
                            <div className="bg-white p-4 rounded-lg">
                                {report.feedback ? (
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <p className="font-semibold mr-2 text-sm">Your Rating:</p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className={`w-5 h-5 ${i < report.feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} solid />
                                                ))}
                                            </div>
                                        </div>
                                        {report.feedback.comment && (
                                            <p className="text-gray-600 text-sm italic bg-gray-50 p-2 rounded">"{report.feedback.comment}"</p>
                                        )}
                                    </div>
                                ) : (
                                    <form onSubmit={handleFeedbackSubmit}>
                                        <p className="text-sm font-semibold text-gray-700 mb-2 text-center">How would you rate the resolution?</p>
                                        <div className="flex justify-center mb-4">
                                            {[...Array(5)].map((_, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={ratingValue}
                                                        onClick={() => setRating(ratingValue)}
                                                        className="focus:outline-none transform transition-transform hover:scale-125"
                                                        aria-label={`Rate ${ratingValue} out of 5 stars`}
                                                    >
                                                        <StarIcon className={`w-8 h-8 transition-colors duration-200 ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} solid />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={3}
                                            placeholder="Add a comment (optional)"
                                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-150"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmittingFeedback || rating === 0}
                                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmittingFeedback ? <Spinner /> : 'Submit Feedback'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Account = () => {
    const { user, reports } = useAppContext();
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    if (!user) {
        return null;
    }

    const myReports = useMemo(() => reports.filter(r => r.userId === user.id), [reports, user]);
    const myVotes = useMemo(() => reports.filter(r => r.votedBy.includes(user.id)), [reports, user]);
    const resolvedReports = useMemo(() => myReports.filter(r => r.status === ReportStatus.Completed).length, [myReports]);

    const StatCard = ({ title, value }: { title: string, value: number }) => (
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">{title}</p>
            <AnimatedNumber value={value} />
        </div>
    );

    const MiniReportCard: React.FC<{ report: Report, onViewDetail: () => void }> = ({ report, onViewDetail }) => (
        <div className="p-2 bg-white rounded-lg shadow-sm flex items-center gap-3">
            <img src={report.image} alt="" className="w-12 h-12 object-cover rounded-md" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{report.description}</p>
                <p className="text-xs text-gray-500">{report.status}</p>
            </div>
            <button onClick={onViewDetail} className="flex-shrink-0 text-xs bg-emerald-100 text-emerald-700 font-semibold py-1 px-3 rounded-full hover:bg-emerald-200 transition-colors">
                Details
            </button>
        </div>
    );

    return (
        <>
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <img src={user.profilePicture} alt={user.name} className="w-20 h-20 rounded-full shadow-lg"/>
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <StatCard title="Reports Filed" value={myReports.length} />
                    <StatCard title="Issues Resolved" value={resolvedReports} />
                    <StatCard title="Votes Cast" value={myVotes.length} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">My Reports</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">{myReports.length > 0 ? myReports.map(r => <MiniReportCard key={r.id} report={r} onViewDetail={() => setSelectedReport(r)} />) : <p className="text-center text-gray-500 text-sm p-4">No reports yet.</p>}</div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">My Votes</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">{myVotes.length > 0 ? myVotes.map(r => <MiniReportCard key={r.id} report={r} onViewDetail={() => setSelectedReport(r)} />) : <p className="text-center text-gray-500 text-sm p-4">No votes yet.</p>}</div>
                </div>
            </div>
            {selectedReport && <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />}
        </>
    );
};

const StatusReportCard: React.FC<{ report: Report, onViewDetail: () => void }> = ({ report, onViewDetail }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
            <img src={report.image} alt="" className="w-16 h-16 object-cover rounded-md"/>
            <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{report.description}</p>
                <p className="text-sm text-gray-500">{report.location.address}</p>
            </div>
            <button 
                onClick={onViewDetail} 
                className="flex-shrink-0 text-xs bg-emerald-100 text-emerald-700 font-semibold py-1 px-3 rounded-full hover:bg-emerald-200 transition-colors"
            >
                Details
            </button>
        </div>
        <StatusTracker status={report.status} />
    </div>
);

const Status = () => {
    const { user, reports } = useAppContext();
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    
    if (!user) {
        return null;
    }

    const myReports = useMemo(() => reports.filter(r => r.userId === user.id).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()), [reports, user]);

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">My Reports Status</h2>
                <div className="space-y-4">
                    {myReports.length > 0 ? myReports.map(report => (
                       <StatusReportCard key={report.id} report={report} onViewDetail={() => setSelectedReport(report)} />
                    )) : <p className="text-gray-500 text-center p-8">You haven't submitted any reports yet.</p>}
                </div>
            </div>
            {selectedReport && <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />}
        </>
    );
};

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const { isAuthenticated, requestLogin } = useAppContext();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
        const currentScrollY = mainEl.scrollTop;
        // Hide header if scrolling down and past a threshold
        if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
            setIsHeaderVisible(false);
        } else { // Show header if scrolling up
            setIsHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: ActiveTab) => {
    const protectedTabs: ActiveTab[] = ['report', 'account', 'status'];
    if (protectedTabs.includes(tabId) && !isAuthenticated) {
        requestLogin();
    } else {
        setActiveTab(tabId);
    }
  };

  const renderContent = () => {
    const contentMap = {
      home: <HomeFeed />,
      report: <ReportIssue onReportSubmitted={() => handleTabClick('status')} />,
      account: <Account />,
      status: <Status />,
    };

    const protectedTabs: ActiveTab[] = ['report', 'account', 'status'];
    if (protectedTabs.includes(activeTab) && !isAuthenticated) {
        return (
            <div key="home-fallback" className="animate-fadeIn">
                <HomeFeed />
            </div>
        );
    }

    return (
      <div key={activeTab} className="animate-fadeIn">
        {contentMap[activeTab] || <HomeFeed />}
      </div>
    );
  };

  const navItems = [
      { id: 'home', icon: HomeIcon, label: 'Home' },
      { id: 'report', icon: CameraIcon, label: 'Report' },
      { id: 'account', icon: UserIcon, label: 'Account' },
      { id: 'status', icon: StatusIcon, label: 'Status' },
  ] as const;

  return (
    <div className="relative max-w-lg mx-auto h-screen bg-gray-50 shadow-2xl flex flex-col">
      <Header onLogoClick={() => handleTabClick('home')} isVisible={isHeaderVisible} />
      <main ref={mainRef} className="flex-grow pt-16 pb-20 overflow-y-auto">
        {renderContent()}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <nav className="flex justify-around">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 text-sm font-medium transition-colors ${activeTab === item.id ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500'}`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default MainApp;
