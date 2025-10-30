// app/notes/Notes.client.tsx
'use client';

import NotesClientPage from '@/components/NotesClientPage/NotesClientPage';
import { fetchNotes } from '@/lib/api';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default function NotesClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes({ page: 1, perPage: 12, search: '' })
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return <NotesClientPage initialData={data} />;
}
