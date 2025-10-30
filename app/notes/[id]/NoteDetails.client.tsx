// app/notes/[id]/NoteDetails.tsx
'use client';

import NoteDetailsClient from '@/components/NoteDetails/NoteDetails';
import type { Note } from '@/lib/api';

type Props = {
  readonly initialNote: Note;
};

export default function NoteDetailsClientPage({ initialNote }: Props) {
  return <NoteDetailsClient initialNote={initialNote} />;
}
