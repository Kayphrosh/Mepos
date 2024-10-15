import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../user/users.scss';
import { ExportIcon, plusIcon, searchIcon } from '../../../assets/images/icons';
import RolesTable from './roles-table';
import axios from '../../../utils/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RolesAndPermission from '../add-new-user/roles-and-permission';
const Roles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {

      try {
        const response = await axios.get('/roles'); 
        if (response.data.status) {
          setRolesData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch roles.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="title">
        <h3>Roles</h3>

        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="" />
            Export as .csv
          </button>

          <Link to="/roles/add-new-role">
            <button>
              <img src={plusIcon} alt="" />
              Add new role
            </button>
          </Link>
        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input type="search" placeholder="Search" />
          <button>
            <img src={searchIcon} alt="" />
          </button>
        </div>

        <div className="filter">
          <div className="label">Filter by:</div>
          <select placeholder="Actions">
            <option>All roles</option>
            <option>user update</option>
            <option>user create</option>
          </select>
        </div>
      </div>

      <RolesTable rolesData={rolesData} setRolesData={setRolesData} />
    </div>
  );
};

export default Roles;
