

import React, { useState } from 'react';

const App = () => {
  // Employee data
  const employees = [
    { id: 1, name: 'emp1', email: 'emp1@gmail.com' },
    { id: 2, name: 'emp2', email: 'emp2@gmail.com' },
    { id: 3, name: 'emp3', email: 'emp3@gmail.com' },
    { id: 4, name: 'emp4', email: 'emp4@gmail.com' }
  ];

  return (
    <div>
      <h1>Employee Data</h1>
      <EmployeeContainer employees={employees} />
    </div>
  );
};

// EmployeeContainer component
const EmployeeContainer = ({ employees }) => {
  // State to toggle between 'list' and 'table' view
  const [view, setView] = useState('list');

  return (
    <div>
      {/* Buttons to switch between List and Table */}
      <button onClick={() => setView('list')}>List View</button>
      <button onClick={() => setView('table')}>Table View</button>

      {/* Conditional rendering based on view */}
      {view === 'list' ? (
        <EmployeeList employees={employees} />
      ) : (
        <EmployeeTable employees={employees} />
      )}
    </div>
  );
};

// EmployeeList component
const EmployeeList = ({ employees }) => {
  return (
    <ul>
      {employees.map(employee => (
        <li key={employee.id}>
          {employee.name} - {employee.email}
        </li>
      ))}
    </ul>
  );
};

// EmployeeTable component
const EmployeeTable = ({ employees }) => {
  return (
    <table border="1" style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
