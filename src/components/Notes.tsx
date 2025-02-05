import React, { useState } from 'react';
import { Notebook, X } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

export function Notes() {
  const { notes, addNote, deleteNote } = useNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');

  const addQuickNote = () => {
    if (currentNote.trim()) {
      const newNote = { 
        id: Date.now().toString(),
        content: currentNote,
        type: 'text' as const,
        timestamp: new Date().toLocaleString()
      };
      addNote(newNote);
      setCurrentNote('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-20 bottom-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Toggle Notes"
      >
        <Notebook size={24} />
      </button>

      {isOpen && (
        <div className="fixed right-20 bottom-24 w-80 bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
          <div className="flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Quick Notes</h2>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="mb-4">
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Type your note here..."
                className="w-full h-24 p-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={addQuickNote}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Note
            </button>
            <div className="mt-4 overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className="p-2 bg-gray-700 text-white rounded-lg mb-2">
                  <p>{note.content}</p>
                  <small className="text-gray-400">{note.timestamp}</small>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}