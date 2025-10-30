// app/notes/[id]/NoteDetails.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { Note } from '@/types/note';

interface NoteDetailsClientProps {
  readonly noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Error loading note'}
      />
    );

  if (!data) return <ErrorMessage message="Note not found" />;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>
      <p>{data.content}</p>
      <p>
        <em>Created: {new Date(data.createdAt).toLocaleString()}</em>
      </p>
    </div>
  );
}
