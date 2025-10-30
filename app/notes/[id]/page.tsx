// app/notes/[id]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById, type Note } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

interface NotePageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id: noteId } = await params;

  const queryClient = new QueryClient();

  const initialNote: Note = await fetchNoteById(noteId);

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetails initialNote={initialNote} />
    </HydrationBoundary>
  );
}

