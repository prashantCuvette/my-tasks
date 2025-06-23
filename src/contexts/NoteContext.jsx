import React, { createContext, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import * as noteService from "../services/noteService";
import useOfflineSync from "../hooks/useOfflineSync";

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useOfflineSync(
    user ? `notes_${user.id}` : "notes_offline",
    []
  );
  const [loading, setLoading] = useState(true);

  const syncNotes = async () => {
    if (!user || !navigator.onLine) return;

    try {
      const serverNotes = await noteService.getNotes(user.id);
      const localOnlyNotes = notes.filter(
        (localNote) =>
          !serverNotes.some((serverNote) => serverNote.id === localNote.id)
      );

      await Promise.all(
        localOnlyNotes.map((note) => noteService.addNote(note))
      );

      const updatedServerNotes = await noteService.getNotes(user.id);
      setNotes(updatedServerNotes);
    } catch (error) {
      console.error("Failed to sync notes", error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      syncNotes().finally(() => setLoading(false));
    }

    window.addEventListener("online", syncNotes);
    return () => window.removeEventListener("online", syncNotes);
  }, [user]);

  const addNote = async (noteData) => {
    const newNote = {
      ...noteData,
      id: Date.now(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    if (navigator.onLine) {
      try {
        await noteService.addNote(newNote);
      } catch (error) {
        console.error("Failed to add note to server", error);
      }
    }
  };

  const updateNote = async (noteId, noteData) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, ...noteData } : note
    );
    setNotes(updatedNotes);
    if (navigator.onLine) {
      try {
        await noteService.updateNote(noteId, noteData);
      } catch (error) {
        console.error("Failed to update note on server", error);
      }
    }
  };

  const deleteNote = async (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    if (navigator.onLine) {
      try {
        await noteService.deleteNote(noteId);
      } catch (error) {
        console.error("Failed to delete note from server", error);
      }
    }
  };

  const value = {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
