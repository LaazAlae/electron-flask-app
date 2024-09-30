const API_URL = 'http://localhost:5000/api'; // Adjust this to match your backend URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'An error occurred');
  }
  return response.json();
};

export const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  return handleResponse(response);
};

export const addEmployee = async (employee) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return handleResponse(response);
};

export const updateEmployee = async (id, data) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const getFlights = async () => {
  const response = await fetch(`${API_URL}/flights`);
  return handleResponse(response);
};

export const addFlight = async (flight) => {
  const response = await fetch(`${API_URL}/flights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flight }),
  });
  return handleResponse(response);
};

export const updateFlight = async (id, data) => {
  const response = await fetch(`${API_URL}/flights/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteFlight = async (id) => {
  const response = await fetch(`${API_URL}/flights/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const getDocuments = async () => {
  const response = await fetch(`${API_URL}/documents`);
  return handleResponse(response);
};

export const addDocument = async (document) => {
  const formData = new FormData();
  formData.append('title', document.title);
  formData.append('file', document.file);
  const response = await fetch(`${API_URL}/documents`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
};

export const deleteDocument = async (id) => {
  const response = await fetch(`${API_URL}/documents/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const selectDocument = async (id) => {
  const response = await fetch(`${API_URL}/documents/${id}/select`, {
    method: 'POST',
  });
  return handleResponse(response);
};

export const submitForm = async (formData) => {
  const response = await fetch(`${API_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};