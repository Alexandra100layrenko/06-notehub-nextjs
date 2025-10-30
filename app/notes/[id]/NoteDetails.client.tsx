// app/notes/[id]/NoteDetails.client.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById, type Note } from '@/lib/api';
import { useParams } from 'next/navigation';
import css from './NoteDetails.client.module.css';

type Props = { readonly initialNote: Note };

export default function NoteDetails({ initialNote }: Props) {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? initialNote.id;

  const { data: note, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    initialData: initialNote,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note)
    return <p>{error instanceof Error ? error.message : 'Something went wrong.'}</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}