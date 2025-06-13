export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  filePath: string;
  fileSize: string;
  fileType: string;
  coverImage: string | null;
  lastReadPosition: number;
  lastReadTimestamp: number;
  totalChapters: number;
  currentFontSize: number;
  currentTheme: 'light' | 'dark' | 'sepia';
  dateAdded: number;
  lastOpened: string;
  progress: number; // 0-100
  readingProgress: number;
  bookmarks: Bookmark[];
  notes: BookNote[];
}

export interface Bookmark {
  id: string;
  position: number;
  timestamp: string;
}

export interface BookNote {
  id: string;
  chapter: number;
  position: number;
  text: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingProgress {
  bookId: string;
  chapter: number;
  position: number;
  timestamp: string;
} 