// app/notes/NotesClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster, toast } from 'react-hot-toast';

import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';

import css from './Notes.client.module.css';

type Props = {
  readonly initialData: FetchNotesResponse;
};

export default function NotesClient({ initialData }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const { data, isLoading, isError, isFetching, isSuccess, error } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', page, debouncedSearch, perPage],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    initialData,
    staleTime: 1000,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(`Failed to fetch notes: ${error.message}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast('No notes found.', { icon: 'ℹ️' });
    }
  }, [isSuccess, data]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1); }} />

        {Boolean(data?.totalPages && data.totalPages > 1) && (
          <Pagination
            pageCount={data.totalPages}
            forcePage={page - 1}
            onPageChange={(selected) => setPage(selected + 1)}
          />
        )}

        <button type="button" className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {(isLoading || isFetching) && <Loader />}
        {isError && (
          <ErrorMessage
            message={error instanceof Error ? error.message : 'Error loading notes'}
          />
        )}
        {data?.notes?.length ? <NoteList notes={data.notes} /> : null}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
