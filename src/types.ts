export interface Program {
  id: string;
  name: string;
  level: string;
  category: 'secondary' | 'matric' | 'intermediate' | 'graduation' | 'masters';
  description: string;
  fullDetails: string;
  subjects: string[];
  duration: string;
  timings: string;
  icon: string;
  badge?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'computer' | 'english';
  duration: string;
  level: string;
  shortDesc: string;
  fullDesc: string;
  modules: string[];
  highlights: string[];
  badge?: string;
  icon: string;
}

export interface Registration {
  id: string;
  slipNumber: string;
  studentName: string;
  fatherName: string;
  dob: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  program: string;
  course: string;
  previousQualification: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Rejected';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Students' | 'Teachers' | 'Computer Lab' | 'Activities' | 'Campus' | 'Events';
  image: string;
  caption: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  tag: string;
  active: boolean;
}

export type BlogCategory =
  | 'All'
  | 'Institute News'
  | 'Commerce & Accounting'
  | 'Career Guidance'
  | 'Student Success'
  | 'Technology & AI';

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorRole: 'Current Student' | 'Alumni' | 'Parent' | 'Prospective Student' | 'Faculty' | 'Visitor';
  comment: string;
  rating: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Institute News' | 'Commerce & Accounting' | 'Career Guidance' | 'Student Success' | 'Technology & AI';
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  featured?: boolean;
  views: number;
  likes: number;
  commentCount?: number;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'AUTH' | 'REGISTRATION' | 'CONTENT' | 'SYSTEM' | 'SECURITY' | 'BACKUP';
  account: string;
  ipMetadata: string;
  details: string;
}

export interface OwnerSession {
  isAuthenticated: boolean;
  ownerName: string;
  ownerEmail: string;
  role: 'OWNER / SUPER ADMIN';
  loginTime: string;
  twoFactorVerified: boolean;
}
