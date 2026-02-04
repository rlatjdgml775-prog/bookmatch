import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, WishlistItem, ReadingRecord, BookEvaluation } from '@/types';

interface BookState {
  // 위시리스트
  wishlist: WishlistItem[];
  
  // 독서 기록
  readingRecords: ReadingRecord[];
  
  // 액션
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  
  // 독서 기록 액션
  addReadingRecord: (record: Omit<ReadingRecord, 'id'>) => void;
  updateReadingRecord: (id: string, updates: Partial<ReadingRecord>) => void;
  evaluateBook: (bookId: string, evaluation: BookEvaluation) => void;
  
  // 통계
  getReadingStats: () => {
    totalBooks: number;
    completedBooks: number;
    likedBooks: number;
    dislikedBooks: number;
  };
}

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      readingRecords: [],

      addToWishlist: (bookId) => {
        const { wishlist } = get();
        if (!wishlist.find((item) => item.bookId === bookId)) {
          const newItem: WishlistItem = {
            id: crypto.randomUUID(),
            bookId,
            userId: '', // Will be set when integrated with auth
            addedAt: new Date(),
          };
          set({ wishlist: [...wishlist, newItem] });
        }
      },

      removeFromWishlist: (bookId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.bookId !== bookId),
        }));
      },

      isInWishlist: (bookId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.bookId === bookId);
      },

      addReadingRecord: (record) => {
        const newRecord: ReadingRecord = {
          ...record,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          readingRecords: [...state.readingRecords, newRecord],
        }));
      },

      updateReadingRecord: (id, updates) => {
        set((state) => ({
          readingRecords: state.readingRecords.map((record) =>
            record.id === id ? { ...record, ...updates } : record
          ),
        }));
      },

      evaluateBook: (bookId, evaluation) => {
        const { readingRecords, addReadingRecord, updateReadingRecord } = get();
        const existingRecord = readingRecords.find((r) => r.bookId === bookId);

        if (evaluation === 'skip') return;

        if (existingRecord) {
          updateReadingRecord(existingRecord.id, {
            feedback: evaluation,
            status: 'completed',
            endDate: new Date(),
          });
        } else {
          addReadingRecord({
            bookId,
            userId: '',
            status: 'completed',
            feedback: evaluation,
            endDate: new Date(),
          });
        }
      },

      getReadingStats: () => {
        const { readingRecords } = get();
        return {
          totalBooks: readingRecords.length,
          completedBooks: readingRecords.filter((r) => r.status === 'completed').length,
          likedBooks: readingRecords.filter((r) => r.feedback === 'like').length,
          dislikedBooks: readingRecords.filter((r) => r.feedback === 'dislike').length,
        };
      },
    }),
    {
      name: 'bookmatch-book-storage',
    }
  )
);
