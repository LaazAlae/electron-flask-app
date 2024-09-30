import React, { useState, useEffect } from 'react';
import EditDataModal from './components/EditDataModal';
import PasswordModal from './components/PasswordModal';
import { getEmployees, getFlights } from './utils/api';

function App() {
  const [name, setName] = useState('');
  const [flight, setFlight] = useState('');
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxes, setBoxes] = useState([{ tag: '', boxNumber: '' }]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Initial local data
  const [employees, setEmployees] = useState(['John Doe', 'Jane Smith', 'Alice Johnson']);
  const [flights, setFlights] = useState(['FL001', 'FL002', 'FL003']);
  const tagOptions = ["SPSM (Green label)", "Serveurs (Yellow label)", "1005 (white label)"];
  const boxOptions = Array.from({length: 10}, (_, i) => `Diplomatic box# ${i+1}`);

  useEffect(() => {
    // Attempt to fetch data from server
    const fetchData = async () => {
        try {
          const [employeesData, flightsData] = await Promise.all([
            getEmployees(),
            getFlights()
          ]);
          if (employeesData.length > 0) setEmployees(employeesData);
          if (flightsData.length > 0) setFlights(flightsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleNumBoxesChange = (e) => {
      const num = parseInt(e.target.value, 10);
      setNumBoxes(num);
      setBoxes(Array(num).fill().map(() => ({ tag: '', boxNumber: '' })));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ name, flight, numBoxes, boxes });
    // Handle form submission logic here
  };

  const handleEditData = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (password) => {
    if (password === '1975') {
      setIsPasswordModalOpen(false);
      setIsEditModalOpen(true);
    } else {
      alert('Incorrect password');
    }
  };

  const isFormValid = () => {
    return name && flight && selectedDocument && boxes.every(box => box.tag && box.boxNumber);
  };

  return (
    <div className="App">
      <h1>Document Processing App</h1>
      <p>{selectedDocument ? `Selected document: ${selectedDocument}` : 'No document selected'}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select an option</option>
            {employees.map((emp, index) => (
              <option key={index} value={emp}>{emp}</option>
            ))}
          </select>
        </label>
        <label>
          Flight:
          <select value={flight} onChange={(e) => setFlight(e.target.value)}>
            <option value="">Select an option</option>
            {flights.map((fl, index) => (
              <option key={index} value={fl}>{fl}</option>
            ))}
          </select>
        </label>
        <label>
          Number of Boxes:
          <input
            type="number"
            value={numBoxes}
            onChange={handleNumBoxesChange}
            min="1"
          />
        </label>
        {boxes.map((box, index) => (
          <div key={index} className="box-inputs">
            <label>
              Tag {index + 1}:
              <select 
                value={box.tag} 
                onChange={(e) => {
                  const newBoxes = [...boxes];
                  newBoxes[index].tag = e.target.value;
                  setBoxes(newBoxes);
                }}
              >
                <option value="">Select an option</option>
                {tagOptions.map((tag, i) => (
                  <option key={i} value={tag}>{tag}</option>
                ))}
              </select>
            </label>
            <label>
              Box {index + 1}:
              <select 
                value={box.boxNumber} 
                onChange={(e) => {
                  const newBoxes = [...boxes];
                  newBoxes[index].boxNumber = e.target.value;
                  setBoxes(newBoxes);
                }}
              >
                <option value="">Select an option</option>
                {boxOptions.map((box, i) => (
                  <option key={i} value={box}>{box}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button type="submit" disabled={!isFormValid()} className={`${!isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white py-2 px-4 rounded`}>
          Submit
        </button>
      </form>
      <button onClick={handleEditData}>Edit Data</button>
      
      {isPasswordModalOpen && (
        <PasswordModal onSubmit={handlePasswordSubmit} onClose={() => setIsPasswordModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditDataModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}

export default App;