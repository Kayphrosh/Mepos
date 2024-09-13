import React from 'react';
import { categoriesData } from './categories-data';
import { editIcon, deleteIcon } from '../../../../assets/images/icons';

const CategoriesTable = () => {
  return (
    <table className="categories-table">
      <thead>
        <tr>
          <th>Category Name <span>↓</span></th>
          <th>Description <span>↓</span></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categoriesData.map((category) => (
          <tr key={category.id}>
            <td>{category.categoryName}</td>
            <td>{category.description}</td>
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

export default CategoriesTable;
