// src/components/NoteForm/NoteForm.tsx
'use client';

import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  readonly onCancel: () => void;
}

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const Schema = Yup.object().shape({
  title: Yup.string().min(3, 'Min 3 chars').max(50, 'Max 50 chars').required('Title is required'),
  content: Yup.string().max(500, 'Max 500 chars'),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onSettled: () => {}, // завершення мутації
  });

  useEffect(() => {
    if (mutation.isSuccess) onCancel();
  }, [mutation.isSuccess, onCancel]);

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={Schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await mutation.mutateAsync(values);
        } finally {
          setSubmitting(false); // 🔹 тільки після завершення мутації
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>

          {mutation.isError && <div className={css.error}>Failed to create note</div>}
        </Form>
      )}
    </Formik>
  );
}
