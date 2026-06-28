
import { Report, ReportCategory, ReportStatus, User } from './types';

export const MOCK_USER: User = {
  id: 'user-123',
  name: 'Ravina',
  profilePicture: 'https://i.pravatar.cc/150?u=anjali_singh',
  email: 'Ravina.demo@gmail.com',
};

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'report-1',
    userId: 'user-456',
    userName: 'Rishika jain',
    userProfilePicture: 'https://i.pravatar.cc/150?u=Rishi_jain',
    image: 'https://th-i.thgim.com/public/incoming/c6r51/article68931823.ece/alternates/FREE_1200/Road_01.jpg',
    description: 'Massive pothole near DB City Mall.',
    location: {
      address: 'Hoshangabad Road, Bhopal',
    },
    category: ReportCategory.Road,
    status: ReportStatus.Reported,
    votes: 28,
    votedBy: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'report-2',
    userId: 'user-789',
    userName: 'Piyhsh Patel',
    userProfilePicture: 'https://i.pravatar.cc/150?u=priya_patel',
    image: 'https://assets.telegraphindia.com/telegraph/6ba8e7fb-dbca-4df1-ae51-2b8db3de46dc.jpg',
    description: 'Garbage dump near Alpana Cineplex has not been cleared for days, causing a terrible smell.',
    location: {
      address: 'Hamidia Road, Bhopal',
    },
    category: ReportCategory.Garbage,
    status: ReportStatus.Acknowledged,
    votes: 15,
    votedBy: ['user-123'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'report-3',
    userId: 'user-123',
    userName: 'Anjali Singh',
    userProfilePicture: 'https://i.pravatar.cc/150?u=anjali_singh',
    image: 'https://www.jividenlaw.com/wp-content/uploads/2022/02/street-lighting-car-accidents.jpg',
    description: 'Streetlight on Link Road No. 1 is not working. It\'s very dark and feels unsafe at night.',
    location: {
      address: 'Link Road No. 1, Bhopal',
    },
    category: ReportCategory.Light,
    status: ReportStatus.Reported,
    votes: 42,
    votedBy: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];