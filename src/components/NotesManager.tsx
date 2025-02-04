import React, { useRef, useState } from 'react';
import { X, Upload, File, FileText, Edit3, Save } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

interface Note{
  id: string;
  title: string;
  content: string;
  type: 'file' | 'text';
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
}

export function NotesManager() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
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
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const startEditing = (note: Note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title || '');
    setEditContent(note.content);
  };

  const saveEdit = (id: string) => {
    updateNote(id, { title: editTitle, content: editContent });
    setEditNoteId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white p-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
        Notes Manager
      </h2>
      
      <div className="mb-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800 animate-slide-in">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="mb-3 bg-zinc-800/50 border-zinc-700 focus:border-orange-500 transition-all"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="w-full h-32 mb-3 bg-zinc-800/50 border-zinc-700 focus:border-orange-500 transition-all resize-none"
        />
        <div className="flex gap-3">
          <Button
            onClick={addNoteWithFile}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 animate-pulse"
          >
            Add Note
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700"
          >
            <Upload size={16} />
            Upload File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        {file && (
          <div className="mt-3 p-2 bg-zinc-800/50 rounded-md animate-fade-in">
            <p className="text-zinc-300">{file.name}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 relative group border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 animate-fade-in"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <X size={16} />
            </Button>
            
            {editNoteId === note.id ? (
              <div className="animate-fade-in">
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mb-2 bg-zinc-800/50 border-zinc-700 focus:border-orange-500"
                />
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-24 bg-zinc-800/50 border-zinc-700 focus:border-orange-500 resize-none"
                />
                <Button
                  onClick={() => saveEdit(note.id)}
                  className="mt-2 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  {note.type === 'file' ? (
                    <File size={20} className="text-orange-400" />
                  ) : (
                    <FileText size={20} className="text-pink-400" />
                  )}
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {note.title}
                  </h3>
                </div>
                
                {note.type === 'file' ? (
                  <div className="mb-2">
                    <a
                      href={note.fileUrl}
                      download={note.fileName}
                      className="text-orange-400 hover:text-orange-300 underline"
                    >
                      Download {note.fileName}
                    </a>
                  </div>
                ) : (
                  <p className="text-zinc-300 mb-2">{note.content}</p>
                )}
                
                <p className="text-zinc-500 text-sm">{note.timestamp}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => startEditing(note)}
                  className="absolute bottom-2 right-2 text-zinc-400 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Edit3 size={16} />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}