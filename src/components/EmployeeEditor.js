import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../utils/api';

const EmployeeEditor = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', id: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleAddEmployee = async () => {
    await addEmployee(newEmployee);
    setNewEmployee({ name: '', id: '' });
    fetchEmployees();
  };

  const handleUpdateEmployee = async (id, updatedData) => {
    await updateEmployee(id, updatedData);
    fetchEmployees();
  };

  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Employees</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="text"
          value={newEmployee.id}
          onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
          placeholder="ID"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={handleAddEmployee}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Employee
        </button>
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="mb-2 flex items-center">
            <span>{employee.name} (ID: {employee.id})</span>
            <button
              onClick={() => handleUpdateEmployee(employee.id, { name: prompt('New name:', employee.name) })}
              className="ml-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteEmployee(employee.id)}
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

export default EmployeeEditor;