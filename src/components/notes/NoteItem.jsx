import React from "react";
import ReactMarkdown from "react-markdown";
import { useNotes } from "../../contexts/NoteContext";
import styles from "./NoteItem.module.css";

const NoteItem = ({ note }) => {
  const { deleteNote } = useNotes();

  return (
    <div className={styles.noteItem}>
      <div className={styles.noteHeader}>
        <h3 className={styles.noteTitle}>{note.title}</h3>
        {/* Edit button will be implemented later */}
        <button onClick={() => deleteNote(note.id)}>🗑️</button>
      </div>
      <div className={styles.noteContent}>
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>
      <div className={styles.noteFooter}>
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default NoteItem;
