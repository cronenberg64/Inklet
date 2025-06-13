import { storage, StorageKeys } from './storage';
import { Bookmark } from '../types/book';

export const bookmarks = {
  async getBookmarks(bookId: string): Promise<Bookmark[]> {
    try {
      const bookmarks = await storage.getItem(`${StorageKeys.BOOKMARKS}_${bookId}`);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  },

  async addBookmark(bookId: string, position: number): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks(bookId);
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        position,
        timestamp: new Date().toISOString(),
      };
      bookmarks.push(newBookmark);
      await storage.setItem(
        `${StorageKeys.BOOKMARKS}_${bookId}`,
        JSON.stringify(bookmarks)
      );
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  },

  async removeBookmark(bookId: string, bookmarkId: string): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks(bookId);
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId
      );
      await storage.setItem(
        `${StorageKeys.BOOKMARKS}_${bookId}`,
        JSON.stringify(updatedBookmarks)
      );
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  },

  async clearBookmarks(bookId: string): Promise<void> {
    try {
      await storage.removeItem(`${StorageKeys.BOOKMARKS}_${bookId}`);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      throw error;
    }
  },
}; 