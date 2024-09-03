import React from 'react';
import '../../../components/ui/table/table.scss';
import { customersData } from './customers-data';
import { actionIcon } from '../../../assets/images/icons';

const CustomersTable = ({customers}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Membership</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.customerID}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.gender}</td>
            <td>{customer.membership}</td>
            <td>
              <div className="actions">
                <img src={actionIcon} alt="" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
