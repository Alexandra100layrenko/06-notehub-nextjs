// app/notes/Notes.client.tsx
'use client';

import NotesClientPage from '@/components/NotesClientPage/NotesClientPage';
import type { FetchNotesResponse } from '@/lib/api';

type Props = {
  readonly initialData: FetchNotesResponse;
};

export default function NotesClient({ initialData }: Props) {
  return <NotesClientPage initialData={initialData} />;
}
