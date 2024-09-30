import React, { useState, useEffect } from 'react';
import { getFlights, addFlight, updateFlight, deleteFlight } from '../utils/api';

const FlightEditor = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const data = await getFlights();
      setFlights(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Failed to load flights. Please try again.');
    }
  };

  const handleAddFlight = async () => {
    try {
      await addFlight(newFlight);
      setNewFlight('');
      fetchFlights();
      setError(null);
    } catch (error) {
      console.error('Error adding flight:', error);
      setError('Failed to add flight. Please try again.');
    }
  };

  const handleUpdateFlight = async (id, updatedData) => {
    try {
      await updateFlight(id, updatedData);
      fetchFlights();
      setError(null);
    } catch (error) {
      console.error('Error updating flight:', error);
      setError('Failed to update flight. Please try again.');
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      await deleteFlight(id);
      fetchFlights();
      setError(null);
    } catch (error) {
      console.error('Error deleting flight:', error);
      setError('Failed to delete flight. Please try again.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Flights</h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <input
          type="text"
          value={newFlight}
          onChange={(e) => setNewFlight(e.target.value)}
          placeholder="Flight Number"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={handleAddFlight}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Flight
        </button>
      </div>
      <ul>
        {flights.map((flight) => (
          <li key={flight} className="mb-2 flex items-center">
            <span>{flight}</span>
            <button
              onClick={() => handleUpdateFlight(flight, prompt('New flight number:', flight))}
              className="ml-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteFlight(flight)}
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

export default FlightEditor;