import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import './form.css';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://${apiUrl}/list_users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email
    };

    try {
      await axios.post(`http://${apiUrl}/add_user`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert(`User Created Successfully...`);

    } catch (error) {
      alert(`User Creation Failed.`);
    }

    window.location.reload();
  };

  return (
    <div>
      <div className="form-container">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Add User</button>
        </form>
      </div>
      <div className="table-container">
        <h1>User List</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;