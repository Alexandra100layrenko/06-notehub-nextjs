// app/notes/error.tsx
'use client';

interface ErrorProps {
  readonly error: Error;
  readonly reset: () => void;
}

export default function NoteError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
