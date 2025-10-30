// components/SearchBox/SearchBox.tsx
import css from './SearchBox.module.css';

interface SearchBoxProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
