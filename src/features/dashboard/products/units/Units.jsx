import React, { useState } from 'react';
import './units.scss';
import { ExportIcon, searchIcon } from '../../../../assets/images/icons';
import UnitsTable from './UnitsTable';

const Units = () => {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [unitName, setUnitName] = useState('');
  const [unitShortName, setUnitShortName] = useState('');
  const [allowDecimal, setAllowDecimal] = useState(false);

  const toggleAddNew = () => setIsAddNewOpen(!isAddNewOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save new unit
    console.log({ unitName, unitShortName, allowDecimal });
    // Reset form
    setUnitName('');
    setUnitShortName('');
    setAllowDecimal(false);
    setIsAddNewOpen(false);
  };

  return (
    <div className="units-container">
      <div className="header">
        <h1>Units</h1>
        <button className="export-btn">
          <img src={ExportIcon} alt="Export" />
          Export as .csv
        </button>
      </div>

      <div className="add-new-section">
        <h2 onClick={toggleAddNew}>
          Add New Unit
          <span className={`arrow ${isAddNewOpen ? 'open' : ''}`}>▼</span>
        </h2>
        {isAddNewOpen && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="unitName">Unit Name *</label>
              <input
                type="text"
                id="unitName"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="E.g Kilogram"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitShortName">Unit Short Name *</label>
              <input
                type="text"
                id="unitShortName"
                value={unitShortName}
                onChange={(e) => setUnitShortName(e.target.value)}
                placeholder="E.g Kg"
                required
              />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="allowDecimal"
                checked={allowDecimal}
                onChange={(e) => setAllowDecimal(e.target.checked)}
              />
              <label htmlFor="allowDecimal">Allow decimal value?</label>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setIsAddNewOpen(false)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </div>

      <div className="products-units">
        <h2>Products Units</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search unit" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><img src={searchIcon} alt="Search" /></button>
        </div>

        <UnitsTable />

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

export default Units;
