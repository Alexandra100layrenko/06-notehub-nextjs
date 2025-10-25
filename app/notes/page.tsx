// app/notes/page.tsx
import NotesClientPage from '@/components/NotesClientPage/NotesClientPage';
import { fetchNotes } from '@/lib/api';

export const revalidate = 0;

export default async function NotesPage() {
  const response = await fetchNotes({ page: 1, perPage: 12, search: '' });
  return <NotesClientPage initialData={response} />;
}
