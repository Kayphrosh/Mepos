import React from 'react';

const CustomerGroupsTable = ({ customerGroupsData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Calculated Percentage (%)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customerGroupsData.map((group) => (
          <tr key={group.id}>
            <td>{group.name}</td>
            <td>{group.calculatedPercentage}</td>
            <td>
              {/* Add your action buttons here, e.g., edit, delete */}
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerGroupsTable;