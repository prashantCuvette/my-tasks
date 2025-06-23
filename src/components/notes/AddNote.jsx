import React, { useState } from 'react';
import { useNotes } from '../../contexts/NoteContext';
import styles from './AddNote.module.css';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useNotes();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) return;
    addNote({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className={styles.addNote}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Take a note... (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote; 