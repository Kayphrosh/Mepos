import React from 'react';
import { permissions } from './permissions-data';

const AccessPermissions = ({ handleNext }) => {
  return (
    <div className="form-container">
      {permissions.map((permission, index) => (
        <div key={index} className="permission-category">
          <div className="category-header">
            <span>{permission.category}</span>

            <div className='select-all'>
              <input type="checkbox" id={`select-all-${index}`} />
              <label htmlFor={`select-all-${index}`}>Select all</label>
            </div>
          </div>
          <div className="category-actions">
            {permission.actions.map((action, idx) => (
              <div key={idx} className="permission-action">
                <input type="checkbox" id={`${permission.category}-${idx}`} />
                <label htmlFor={`${permission.category}-${idx}`}>
                  {action}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="default-role">
        <input type="checkbox" id="default-role" />
        <label htmlFor="default-role">
          Save selections as default for "Cashier" role
        </label>
      </div>
      <div className="form-cta">
        <div id="save" onClick={handleNext}>
          Create Role
        </div>
      </div>
    </div>
  );
};

export default AccessPermissions;
