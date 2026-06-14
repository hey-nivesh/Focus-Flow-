import React, { useState, useCallback, useMemo } from 'react';
import { Notebook, X } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

interface Note {
  id: string;
  content: string;
  type: 'text';
  timestamp: string;
}

interface NotesProps {
  maxHeight?: string;
}

export const Notes: React.FC<NotesProps> = React.memo(({ maxHeight = '400px' }) => {
  const { notes, addNote, deleteNote } = useNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');

  const toggleNotes = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote(e.target.value);
  }, []);

  const addQuickNote = useCallback(() => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote,
        type: 'text',
        timestamp: new Date().toLocaleString()
      };
      addNote(newNote);
      setCurrentNote('');
    }
  }, [currentNote, addNote]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addQuickNote();
    }
  }, [addQuickNote]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [notes]);

  return (
    <>
      <button
        onClick={toggleNotes}
        className="fixed right-20 bottom-6 p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 animate-pulse"
        title="Toggle Notes"
        aria-label="Toggle quick notes"
        aria-expanded={isOpen}
      >
        <Notebook size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed right-20 bottom-24 w-80 bg-zinc-900/90 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-zinc-800 animate-slide-in"
          role="dialog"
          aria-label="Quick notes"
        >
          <div className="flex flex-col h-full" style={{ maxHeight }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Quick Notes
              </h2>
              <button
                onClick={toggleNotes}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Close notes"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <textarea
                value={currentNote}
                onChange={handleNoteChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your note here..."
                className="w-full h-24 p-2 bg-zinc-800/50 text-white rounded-lg resize-none border border-zinc-700 focus:outline-none focus:border-orange-500 transition-all"
                aria-label="New note content"
              />
            </div>

            <button
              onClick={addQuickNote}
              className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!currentNote.trim()}
            >
              Add Note
            </button>

            <div className="mt-4 flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
              {sortedNotes.length > 0 ? (
                sortedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-zinc-800/50 backdrop-blur-sm text-white rounded-lg border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 group"
                  >
                    <p className="text-zinc-300 whitespace-pre-wrap">{note.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <small className="text-zinc-500">{note.timestamp}</small>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-zinc-500 hover:text-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-label={`Delete note: ${note.content.substring(0, 20)}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-zinc-500 py-4">
                  No notes yet. Add your first note!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});