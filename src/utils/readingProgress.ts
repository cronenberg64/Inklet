import { storage } from './storage';
import { StorageKeys } from '../constants/storage';
import { Book } from '../types/book';

export const readingProgress = {
  async updateProgress(bookId: string, progress: number): Promise<void> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            readingProgress: progress,
            lastReadPosition: progress,
            lastReadTimestamp: Date.now(),
          };
        }
        return book;
      });
      await storage.setItem(StorageKeys.BOOKS, updatedBooks);
    } catch (error) {
      console.error('Error updating reading progress:', error);
      throw error;
    }
  },

  async addBookmark(bookId: string, position: number, note?: string): Promise<void> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          const newBookmark = {
            id: Date.now().toString(),
            position,
            note,
            timestamp: Date.now(),
          };
          return {
            ...book,
            bookmarks: [...book.bookmarks, newBookmark],
          };
        }
        return book;
      });
      await storage.setItem(StorageKeys.BOOKS, updatedBooks);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  },

  async removeBookmark(bookId: string, bookmarkId: string): Promise<void> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            bookmarks: book.bookmarks.filter((bm) => bm.id !== bookmarkId),
          };
        }
        return book;
      });
      await storage.setItem(StorageKeys.BOOKS, updatedBooks);
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  },

  async getBookProgress(bookId: string): Promise<number> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const book = books.find((b) => b.id === bookId);
      return book?.readingProgress || 0;
    } catch (error) {
      console.error('Error getting book progress:', error);
      throw error;
    }
  },

  async getBookmarks(bookId: string): Promise<Book['bookmarks']> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const book = books.find((b) => b.id === bookId);
      return book?.bookmarks || [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      throw error;
    }
  },
}; 