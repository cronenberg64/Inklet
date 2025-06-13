export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPinned: boolean;
  color?: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  color?: string;
} 