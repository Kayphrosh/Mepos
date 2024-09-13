import React, { useState } from 'react';
import './categories.scss';
import { ExportIcon, searchIcon } from '../../../../assets/images/icons';
import CategoriesTable from './CategoriesTable';

const Categories = () => {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [rackNumber, setRackNumber] = useState('');

  const toggleAddNew = () => setIsAddNewOpen(!isAddNewOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save new category
    console.log({ categoryName, description, rackNumber });
    // Reset form
    setCategoryName('');
    setDescription('');
    setRackNumber('');
    setIsAddNewOpen(false);
  };

  return (
    <div className="categories-container">
      <div className="header">
        <h1>Categories</h1>
        <button className="export-btn">
          <img src={ExportIcon} alt="Export" />
          Export as .csv
        </button>
      </div>

      <div className="add-new-section">
        <h2 onClick={toggleAddNew}>
          Add New Category
          <span className={`arrow ${isAddNewOpen ? 'open' : ''}`}>▼</span>
        </h2>
        {isAddNewOpen && (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="categoryName">Category Name *</label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="E.g Ingredients"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rackNumber">Rack Number *</label>
                <input
                  type="text"
                  id="rackNumber"
                  value={rackNumber}
                  onChange={(e) => setRackNumber(e.target.value)}
                  placeholder="E.g Rack 12"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setIsAddNewOpen(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="products-categories">
        <h2>Products Categories</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search category" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><img src={searchIcon} alt="Search" /></button>
        </div>

        <CategoriesTable />

        <div className="pagination">
          <div className="entries-per-page">
            <span>Show</span>
            <select>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="page-numbers">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
