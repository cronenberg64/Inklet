export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  filePath: string;
  lastReadPosition: number;
  lastReadChapter: number;
  totalChapters: number;
  currentFontSize: number;
  currentTheme: 'light' | 'dark' | 'sepia';
  dateAdded: string;
  lastOpened: string;
  progress: number; // 0-100
  bookmarks: Bookmark[];
  notes: BookNote[];
}

export interface Bookmark {
  id: string;
  chapter: number;
  position: number;
  text: string;
  createdAt: string;
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