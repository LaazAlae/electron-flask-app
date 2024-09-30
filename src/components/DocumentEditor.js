import React, { useState, useEffect } from 'react';
import { getDocuments, addDocument, deleteDocument, selectDocument } from '../utils/api';

const DocumentEditor = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ title: '', file: null });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const data = await getDocuments();
    setDocuments(data);
  };

  const handleAddDocument = async () => {
    await addDocument(newDocument);
    setNewDocument({ title: '', file: null });
    fetchDocuments();
  };

  const handleDeleteDocument = async (id) => {
    await deleteDocument(id);
    fetchDocuments();
  };

  const handleSelectDocument = async (id) => {
    await selectDocument(id);
    fetchDocuments();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Documents</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newDocument.title}
          onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
          placeholder="Document Title"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="file"
          onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={handleAddDocument}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Document
        </button>
      </div>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2 flex items-center">
            <span>{doc.title}</span>
            <button
              onClick={() => handleSelectDocument(doc.id)}
              className="ml-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              Select
            </button>
            <button
              onClick={() => handleDeleteDocument(doc.id)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentEditor;