export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Akademik' | 'Event' | 'Beasiswa';
  date: string;
  isPrioritas?: boolean;
  image?: string;
  author: string;
  icon?: string;
  views: number;
}

export interface Schedule {
  id: string;
  day: string;
  subject: string;
  room: string;
  lecturer: string;
  time: string;
  type: 'Teori' | 'Praktikum';
}

export interface Student {
  id: string;
  nim: string;
  name: string;
  role?: string;
  status: 'Aktif' | 'Cuti' | 'Lulus';
  email: string;
  phone?: string;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface ActivityLog {
  id: string;
  text: string;
  time: string;
  author: string;
  type: 'primary' | 'secondary' | 'warning';
}

export interface ClassConfig {
  className: string;
  academicYear: string;
  accreditation: string;
  university: string;
  faculty: string;
  major: string;
  vision: string;
  mission: string[];
}
