import { useState } from 'react';

export default function EmployeeSelection(){
  const employeeData = [
    { id: 1, name: 'emp11', email: 'emp11@gmail.com', selected: false },
    { id: 2, name: 'emp12', email: 'emp12@gmail.com', selected: false },
    { id: 3, name: 'emp13', email: 'emp13@gmail.com', selected: false },
    { id: 4, name: 'emp14', email: 'emp14@gmail.com', selected: false }
  ];
  const [users, setUsers] = useState(employeeData);
  const selectedUsers = users.filter(user => user.selected);

  const handleCheckboxChange = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={user.selected} 
                  onChange={() => handleCheckboxChange(user.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Selected Employees:</h3>
      <ul>
   {selectedUsers.map(user => (
      <li key={user.id}>{user.name} ({user.email})</li>
    ))}
  </ul>
    </div>
  );
};



