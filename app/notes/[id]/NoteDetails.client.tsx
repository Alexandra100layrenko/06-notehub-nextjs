// app/notes/[id]/NoteDetails.tsx
'use client';

import NoteDetailsClient from '@/components/NoteDetailsClient/NoteDetailsClient';
import type { Note } from '@/lib/api';

type Props = { readonly initialNote: Note };

export default function NoteDetailsClientWrapper({ initialNote }: Props) {
  return <NoteDetailsClient initialNote={initialNote} />;
}

