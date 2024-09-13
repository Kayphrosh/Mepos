import React from 'react';
import { variationsData } from './variations-data';
import { editIcon, deleteIcon } from '../../../../assets/images/icons';

const VariationsTable = () => {
  return (
    <table className="variations-table">
      <thead>
        <tr>
          <th>Variations <span>↓</span></th>
          <th>Items List <span>↓</span></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {variationsData.map((variation) => (
          <tr key={variation.id}>
            <td>{variation.variation}</td>
            <td>{variation.itemsList}</td>
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

export default VariationsTable;
