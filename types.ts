
export interface User {
  id: string;
  name: string;
  profilePicture?: string;
  email?: string;
}

export enum ReportCategory {
  Water = 'Water',
  Light = 'Light',
  Garbage = 'Garbage',
  Road = 'Road',
  Other = 'Other',
}

export enum ReportStatus {
  Reported = 'Reported',
  Acknowledged = 'Acknowledged',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  userProfilePicture?: string;
  image: string;
  description: string;
  location: {
    address: string;
  };
  category: ReportCategory;
  status: ReportStatus;
  votes: number;
  votedBy: string[];
  createdAt: Date;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface Notification {
  id: number;
  message: string;
}

export type ActiveTab = 'home' | 'report' | 'account' | 'status';