// app/notes/[id]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  readonly params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const noteId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
