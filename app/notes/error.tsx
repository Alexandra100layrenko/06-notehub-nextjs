// app/notes/error.tsx
'use client';

type Props = {
  readonly error: Error;
  readonly reset: () => void;
};

export default function NoteError({ error, reset }: Props) {
  return (
    <div>
      <h2>Could not fetch the list of notes</h2>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
