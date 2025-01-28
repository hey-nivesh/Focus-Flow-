import React, { createContext, useContext, useState, useEffect } from 'react';

interface Note {
  id: string;
  title?: string;
  content: string;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('productivityNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('productivityNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};