import React, { useRef, useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'file' | 'text';
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
}
import { X, Upload, File, FileText, Edit3, Save } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

export function NotesManager() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNoteWithFile = () => {
    if (title.trim() && (content.trim() || file)) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        type: file ? 'file' : 'text' as const,
        fileUrl: file ? URL.createObjectURL(file) : undefined,
        fileName: file ? file.name : undefined,
        timestamp: new Date().toLocaleString()
      };
      addNote(newNote);
      setTitle('');
      setContent('');
      setFile(null);
      setFileContent('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const startEditing = (note: any) => {
    setEditNoteId(note.id);
    setEditTitle(note.title || '');
    setEditContent(note.content);
  };

  const saveEdit = (id: string) => {
    updateNote(id, { title: editTitle, content: editContent });
    setEditNoteId(null);
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
            onClick={addNoteWithFile}
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
        {file && (
          <div className="mt-3 p-2 bg-gray-600 rounded-md">
            <p className="text-white">{file.name}</p>
          </div>
        )}
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
            
            {editNoteId === note.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 p-2 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-24 p-2 bg-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => saveEdit(note.id)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                >
                  <Save size={16} />
                  Save
                </button>
              </>
            ) : (
              <>
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
                <button
                  onClick={() => startEditing(note)}
                  className="absolute bottom-2 right-2 text-gray-400 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}