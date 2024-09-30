import React, { useState } from 'react';

const MainForm = () => {
  const [name, setName] = useState('');
  const [flight, setFlight] = useState('');
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxes, setBoxes] = useState([{ tag: '', boxNumber: '' }]);

  const handleNumBoxesChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumBoxes(num);
    setBoxes(Array(num).fill().map(() => ({ tag: '', boxNumber: '' })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, flight, numBoxes, boxes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an option</option>
          {/* Add options here */}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Flight:</label>
        <select
          value={flight}
          onChange={(e) => setFlight(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an option</option>
          {/* Add options here */}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Boxes:</label>
        <input
          type="number"
          min="1"
          value={numBoxes}
          onChange={handleNumBoxesChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      {boxes.map((box, index) => (
        <div key={index} className="flex space-x-2">
          <select
            value={box.tag}
            onChange={(e) => {
              const newBoxes = [...boxes];
              newBoxes[index].tag = e.target.value;
              setBoxes(newBoxes);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select an option</option>
            {/* Add tag options here */}
          </select>
          <select
            value={box.boxNumber}
            onChange={(e) => {
              const newBoxes = [...boxes];
              newBoxes[index].boxNumber = e.target.value;
              setBoxes(newBoxes);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select an option</option>
            {/* Add box number options here */}
          </select>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default MainForm;