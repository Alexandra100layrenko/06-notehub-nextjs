// lib/api.ts
import axios from 'axios';
import type { Note, NoteTag } from '../app/types/note';

export type { Note } from '../app/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? '';

if (!API_TOKEN) {
  console.warn('⚠️ NEXT_PUBLIC_NOTEHUB_TOKEN is not set');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag?: NoteTag;
  sortBy: 'created' | 'updated';
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
  sortBy = 'created',
}: Partial<FetchNotesParams> = {}): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = { page, perPage, search, sortBy };
  if (tag) params.tag = tag;
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const getNotes = fetchNotes;

export const fetchNoteById = async (id: string): Promise<Note> => {
  if (!id) throw new Error('Note id is required');
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export interface CreateNotePayload {
  title: string;
  content?: string | null;
  tag: NoteTag;
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  if (!note.title || note.title.trim().length < 3) {
    throw new Error('Title must be at least 3 characters');
  }
  if (!note.tag) {
    throw new Error('Tag is required');
  }

  const payload = { ...note, content: note.content?.trim() || null };
  const { data } = await api.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  if (!id) throw new Error('Note ID is required');
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
