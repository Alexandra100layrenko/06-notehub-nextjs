// app/notes/[id]/page.tsx
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClientWrapper from './NoteDetails.client';

type Props = {
  readonly params: { id: string };
};

export default async function NoteDetailsPage({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return <NoteDetailsClientWrapper initialNote={note} />;
}

