// app/notes/Notes.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClientPage from '@/components/NotesClientPage/NotesClientPage';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Простая реализация debounce без отдельного хука
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', { page, perPage: 12, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Error loading notes'}
      />
    );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <button onClick={() => setIsModalOpen(true)}>Create Note</button>

      {data && <NotesClientPage initialData={data} />}

      <Pagination
        pageCount={data?.totalPages || 1}
        onPageChange={(selected: number) => setPage(selected + 1)}
        forcePage={page - 1}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

