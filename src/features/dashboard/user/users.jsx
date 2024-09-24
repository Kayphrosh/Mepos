import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './users.scss';
import { ExportIcon, plusIcon, searchIcon } from '../../../assets/images/icons';
import UsersTable from './users-table';
import { Link } from 'react-router-dom';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storeId = localStorage.getItem('storeId');
        const response = await axios.get(
          `/${storeId}/users`,
        );

        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          setError('Failed to fetch users. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('An error occurred while fetching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="role-container users-container">
      <div className="title">
        <h3>Users</h3>

        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="Export as CSV" />
            Export as .csv
          </button>
          <Link to="/users/add-new-user">
            <button>
              <img src={plusIcon} alt="Add new user" />
              Add new user
            </button>
          </Link>
        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="filter">
          <div className="label">Filter by:</div>
          <select placeholder="Actions">
            <option>All Users</option>
            <option>View</option>
            <option>Edit</option>
            <option>Delete</option>
          </select>
        </div>
      </div>

      <UsersTable users={users} searchQuery={searchQuery} />
    </div>
  );
};

export default Users;
