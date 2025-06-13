import RNFS from 'react-native-fs';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import { storage } from './storage';
import { StorageKeys } from '../constants/storage';
import { Book } from '../types/book';

const BOOKS_DIRECTORY = `${RNFS.DocumentDirectoryPath}/books`;

export const fileManager = {
  async initialize() {
    try {
      const exists = await RNFS.exists(BOOKS_DIRECTORY);
      if (!exists) {
        await RNFS.mkdir(BOOKS_DIRECTORY);
      }
    } catch (error) {
      console.error('Error initializing books directory:', error);
      throw error;
    }
  },

  async pickBook(): Promise<Book | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/epub+zip'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return null;
      }

      const file = result.assets[0];
      const fileName = file.name;
      const fileUri = file.uri;
      const fileSize = file.size || 0;
      const fileType = file.mimeType || 'application/epub+zip';

      // Generate a unique ID for the book
      const bookId = Date.now().toString();

      // Create book object
      const book: Book = {
        id: bookId,
        title: fileName.replace('.epub', ''),
        author: 'Unknown', // We'll extract this from metadata later
        filePath: fileUri,
        fileSize: fileSize.toString(),
        fileType,
        coverImage: null, // We'll extract this from metadata later
        lastReadPosition: 0,
        lastReadTimestamp: Date.now(),
        dateAdded: Date.now(),
        readingProgress: 0,
        bookmarks: [],
      };

      // Save book to storage
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      await storage.setItem(StorageKeys.BOOKS, [...books, book]);

      return book;
    } catch (error) {
      console.error('Error picking book:', error);
      throw error;
    }
  },

  async deleteBook(bookId: string): Promise<void> {
    try {
      // Get books from storage
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const book = books.find((b: Book) => b.id === bookId);

      if (book) {
        // Delete file if it exists
        if (book.filePath) {
          const exists = await RNFS.exists(book.filePath);
          if (exists) {
            await RNFS.unlink(book.filePath);
          }
        }

        // Remove book from storage
        const updatedBooks = books.filter((b: Book) => b.id !== bookId);
        await storage.setItem(StorageKeys.BOOKS, updatedBooks);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  async getBookFile(bookId: string): Promise<string | null> {
    try {
      const books = await storage.getItem<Book[]>(StorageKeys.BOOKS) || [];
      const book = books.find((b: Book) => b.id === bookId);
      return book?.filePath || null;
    } catch (error) {
      console.error('Error getting book file:', error);
      throw error;
    }
  },
}; 