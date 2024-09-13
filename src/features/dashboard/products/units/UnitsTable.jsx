import React from 'react';
import { unitsData } from './units-data';
import { editIcon, deleteIcon } from '../../../../assets/images/icons';

const UnitsTable = () => {
  return (
    <table className="units-table">
      <thead>
        <tr>
          <th>Unit Name <span>↓</span></th>
          <th>Short Name <span>↓</span></th>
          <th>Allow Decimal <span>↓</span></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {unitsData.map((unit) => (
          <tr key={unit.id}>
            <td>{unit.unitName}</td>
            <td>{unit.shortName}</td>
            <td>{unit.allowDecimal}</td>
            <td>
              <div className="actions">
                <button className="edit-btn">
                  <img src={editIcon} alt="Edit" />
                </button>
                <button className="delete-btn">
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UnitsTable;
