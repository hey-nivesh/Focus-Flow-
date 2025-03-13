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
        className="fixed right-20 bottom-6 p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 animate-pulse"
        title="Toggle Notes"
      >
        <Notebook size={24} />
      </button>

      {isOpen && (
        <div className="fixed right-20 bottom-24 w-80 bg-zinc-900/90 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-zinc-800 animate-slide-in">
          <div className="flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Quick Notes</h2>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="mb-4">
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Type your note here..."
                className="w-full h-24 p-2 bg-zinc-800/50 text-white rounded-lg resize-none border border-zinc-700 focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>
            <button
              onClick={addQuickNote}
              className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
            >
              Add Note
            </button>
            <div className="mt-4 overflow-y-auto space-y-2 custom-scrollbar">
              {notes.map((note) => (
                <div key={note.id} className="p-3 bg-zinc-800/50 backdrop-blur-sm text-white rounded-lg border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 group">
                  <p className="text-zinc-300">{note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <small className="text-zinc-500">{note.timestamp}</small>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-zinc-500 hover:text-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}