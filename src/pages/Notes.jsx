import React from "react";
import { useNotes } from "../contexts/NoteContext";
import NoteItem from "../components/notes/NoteItem";
import AddNote from "../components/notes/AddNote";
import styles from "./Notes.module.css";

const NotesPage = () => {
  const { notes, loading } = useNotes();

  return (
    <div className={styles.notesPage}>
      <h1 className={styles.title}>Notes</h1>
      <AddNote />
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
