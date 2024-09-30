import React, { useState } from 'react';
import EmployeeEditor from './EmployeeEditor';
import FlightEditor from './FlightEditor';
import DocumentEditor from './DocumentEditor';

const EditDataModal = ({ onClose }) => {
  const [activeEditor, setActiveEditor] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
        {!activeEditor ? (
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setActiveEditor('employees')}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Employees
            </button>
            <button
              onClick={() => setActiveEditor('flights')}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Edit Flights
            </button>
            <button
              onClick={() => setActiveEditor('documents')}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Edit Documents
            </button>
          </div>
        ) : (
          <div>
            {activeEditor === 'employees' && <EmployeeEditor />}
            {activeEditor === 'flights' && <FlightEditor />}
            {activeEditor === 'documents' && <DocumentEditor />}
            <button
              onClick={() => setActiveEditor(null)}
              className="mt-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditDataModal;