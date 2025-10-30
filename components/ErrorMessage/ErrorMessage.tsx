// components/ErrorMessage/ErrorMessage.tsx
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  readonly message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={css.text}>{message}</p>;
}
