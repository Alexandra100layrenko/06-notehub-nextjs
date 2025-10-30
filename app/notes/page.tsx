// app/notes/page.tsx
// app/notes/page.tsx
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  // Серверный fetch только для первой страницы
  const initialData: FetchNotesResponse = await fetchNotes({ page: 1, perPage: 12, search: '' });

  return <NotesClient initialData={initialData} />;
}

