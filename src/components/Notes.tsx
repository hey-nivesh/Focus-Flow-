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
        className="fixed right-6 bottom-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Toggle Notes"
      >
        <Notebook size={24} />
      </button>

      {isOpen && (
        <div className="fixed right-6 bottom-24 w-80 bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
          <div className="flex flex-col h-[400px]">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Notes</h2>
            
            <div className="mb-4">
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Type your note here..."
                className="w-full h-24 p-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addQuickNote}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                Add Note
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-700 rounded-lg p-3 mb-2 relative group"
                >
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                  <p className="text-white text-sm mb-2">{note.content}</p>
                  <p className="text-gray-400 text-xs">{note.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}