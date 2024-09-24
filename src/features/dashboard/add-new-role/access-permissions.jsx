import React, { useState, useEffect, useRef } from 'react';

const AccessPermissions = ({ handleNext, updateRoleData, roleData }) => {
  const [selectedPermissions, setSelectedPermissions] = useState({
    'user-create': false,
    'user-update': false,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Set initial permissions on first render
      setSelectedPermissions({
        'user-create': roleData.permissions.includes('user-create'),
        'user-update': roleData.permissions.includes('user-update'),
      });
      isFirstRender.current = false; // Update ref to indicate first render is done
    }
  }, [roleData.permissions]);

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) => {
      const newPermissions = { ...prev, [permission]: !prev[permission] };
      updateRoleDataPermissions(newPermissions);
      return newPermissions; // Return updated permissions
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const newPermissions = {
      'user-create': checked,
      'user-update': checked,
    };
    setSelectedPermissions(newPermissions);
    updateRoleDataPermissions(newPermissions); // Update role data immediately
  };

  const updateRoleDataPermissions = (newPermissions) => {
    const permissions = Object.entries(newPermissions)
      .filter(([_, isSelected]) => isSelected)
      .map(([permission]) => permission);
    updateRoleData({ permissions });
  };

  return (
    <div className="form-container">
      <div className="permission-category">
        <div className="category-header">
          <span>User Permissions</span>

          <div className="select-all">
            <input
              type="checkbox"
              onChange={handleSelectAllChange}
              checked={Object.values(selectedPermissions).every(Boolean)} // Check if all are selected
            />
            <label>Select all</label>
          </div>
        </div>

        <div className="category-actions">
          {['user-create', 'user-update'].map((permission) => (
            <div key={permission} className="permission-action">
              <input
                type="checkbox"
                id={permission}
                checked={selectedPermissions[permission]}
                onChange={() => handlePermissionChange(permission)}
              />
              <label htmlFor={permission}>
                {permission === 'user-create' ? 'Create User' : 'Update User'}
              </label>
            </div>
          ))}
        </div>
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
