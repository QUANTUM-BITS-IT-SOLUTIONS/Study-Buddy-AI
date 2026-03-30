import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface UploadedDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  size: number;
  uploadedAt: Date;
}

interface DocumentContextType {
  documents: UploadedDocument[];
  addDocument: (file: File) => Promise<void>;
  removeDocument: (id: string) => void;
  clearAllDocuments: () => void;
  totalStorageUsed: number;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const STORAGE_KEY = 'rag_tutor_documents';
const MAX_STORAGE = 100 * 1024 * 1024; // 100MB limit for demo

export function DocumentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);

  const getUserStorageKey = () => `${STORAGE_KEY}_${user?.id || 'guest'}`;

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(getUserStorageKey());
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDocuments(parsed.map((doc: UploadedDocument & { uploadedAt: string }) => ({
            ...doc,
            uploadedAt: new Date(doc.uploadedAt),
          })));
        } catch {
          localStorage.removeItem(getUserStorageKey());
        }
      }
    } else {
      setDocuments([]);
    }
  }, [user]);

  const saveDocuments = (docs: UploadedDocument[]) => {
    if (user) {
      localStorage.setItem(getUserStorageKey(), JSON.stringify(docs));
    }
  };

  const getFileType = (fileName: string): 'pdf' | 'docx' | 'txt' => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'docx' || ext === 'doc') return 'docx';
    return 'txt';
  };

  const addDocument = async (file: File): Promise<void> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newDoc: UploadedDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: getFileType(file.name),
      size: file.size,
      uploadedAt: new Date(),
    };

    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    saveDocuments(updatedDocs);
  };

  const removeDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    saveDocuments(updatedDocs);
  };

  const clearAllDocuments = () => {
    setDocuments([]);
    if (user) {
      localStorage.removeItem(getUserStorageKey());
    }
  };

  const totalStorageUsed = documents.reduce((acc, doc) => acc + doc.size, 0);

  return (
    <DocumentContext.Provider value={{ 
      documents, 
      addDocument, 
      removeDocument, 
      clearAllDocuments,
      totalStorageUsed 
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}

export { MAX_STORAGE };
