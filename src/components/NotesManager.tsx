import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, File, FileText } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
}

export function NotesManager() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('productivityNotesManager');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('productivityNotesManager', JSON.stringify(notes));
  }, [notes]);

  const addTextNote = () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        type: 'text' as const,
        timestamp: new Date().toLocaleString()
      };
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a blob URL for the file
      const fileUrl = URL.createObjectURL(file);
      const newNote = {
        id: Date.now().toString(),
        title: file.name,
        content: `File size: ${(file.size / 1024).toFixed(2)} KB`,
        type: 'file' as const,
        fileUrl,
        fileName: file.name,
        timestamp: new Date().toLocaleString()
      };
      setNotes([newNote, ...notes]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => {
      if (note.type === 'file' && note.fileUrl) {
        URL.revokeObjectURL(note.fileUrl);
      }
      return note.id !== id;
    }));
  };

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Notes Manager</h2>
      
      <div className="mb-6 bg-gray-700 rounded-lg p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full mb-3 p-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="w-full h-32 p-2 mb-3 bg-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            onClick={addTextNote}
            className="flex-1 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Note
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            <Upload size={16} />
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-700 rounded-lg p-4 relative group"
          >
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-2">
              {note.type === 'file' ? (
                <File size={20} className="text-blue-400" />
              ) : (
                <FileText size={20} className="text-green-400" />
              )}
              <h3 className="text-lg font-semibold">{note.title}</h3>
            </div>
            
            {note.type === 'file' ? (
              <div className="mb-2">
                <a
                  href={note.fileUrl}
                  download={note.fileName}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Download {note.fileName}
                </a>
              </div>
            ) : (
              <p className="text-gray-300 mb-2">{note.content}</p>
            )}
            
            <p className="text-gray-400 text-sm">{note.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}