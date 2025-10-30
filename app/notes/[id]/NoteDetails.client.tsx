// app/notes/[id]/page.tsx
import NoteDetailsClient from '@/components/NoteDetails/NoteDetails';
import { fetchNoteById } from '@/lib/api';

type Props = { readonly params: { id: string } };

export default async function NoteDetailsPage({ params }: Props) {
  const note = await fetchNoteById(params.id);
  return <NoteDetailsClient initialNote={note} />;
}
