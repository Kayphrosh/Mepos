import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './sidebar.scss';
import logo from '../../assets/images/logo.svg';
import {
  home,
  homeActive,
  users,
  usersActive,
  sales,
  salesActive,
  product,
  productActive,
  purchases,
  expenses,
  payment,
  contact,
  report,
  logout,
  settings,
  notification,
  dropdownIcon,
} from '../../assets/images/icons';

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { pathname } = useLocation();
  const { storeId } = useParams(); // Fetch storeId from URL

  // Check and fallback to localStorage if storeId is not in the URL
  const resolvedStoreId = storeId || localStorage.getItem('storeId');

  // Debugging logs to trace the storeId values
  useEffect(() => {
    // console.log('storeId from useParams: ', storeId);
    // console.log('storeId from localStorage: ', localStorage.getItem('storeId'));
    // console.log('Resolved storeId: ', resolvedStoreId);

    if (!resolvedStoreId) {
      console.warn('No storeId found in URL or localStorage');
      // Optionally, redirect to a store selection page
    }
  }, [storeId, resolvedStoreId]);

  // Automatically open the dropdown if one of its links is active
  useEffect(() => {
    if (['/users-list', '/add-user', '/user-roles'].includes(pathname)) {
      setActiveDropdown('users');
    } else if (
      ['/sales-report', '/add-sale', '/sales-summary'].includes(pathname)
    ) {
      setActiveDropdown('sales');
    }
  }, [pathname]);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const renderNavLink = (to, icon, activeIcon, label) => (
    <li key={to} className={pathname === to ? 'active' : ''} id="no-dropdown">
      <Link to={to}>
        <img src={pathname === to ? activeIcon : icon} alt="" />
        <span>{label}</span>
      </Link>
    </li>
  );

  const renderDropdownLink = (to, label) => (
    <li
      key={to}
      className={pathname === to ? 'dropdown-link-active' : ''}
      id="dropdown"
    >
      <Link to={to}>{label}</Link>
    </li>
  );

  const renderDropdownMenu = (menuKey, icon, activeIcon, label, links) => (
    <li
      key={menuKey}
      className={`dropdown ${
        activeDropdown === menuKey ? 'dropdown-active' : ''
      }`}
    >
      <div onClick={() => toggleDropdown(menuKey)} className="dropdown-toggle">
        <div className="nav-desc">
          <img
            src={
              activeDropdown === menuKey ||
              links.some((link) => pathname === link.to)
                ? activeIcon
                : icon
            }
            alt=""
          />
          <span>{label}</span>
        </div>
        <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
      </div>
      {activeDropdown === menuKey && (
        <ul className="dropdown-menu">
          {links.map(({ to, label }) => renderDropdownLink(to, label))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="sidebar-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="nav-links">
        <div className="nav-section">
          <div className="title">Main</div>
          <ul>
            {renderNavLink('/home', home, homeActive, 'Home')}
            {renderDropdownMenu(
              'users',
              users,
              usersActive,
              'Users Management',
              [
                { to: '/users', label: 'Users' },
                { to: '/roles', label: 'Roles' },
                { to: '/customers', label: 'Customers' },
              ],
            )}
            {renderDropdownMenu('sales', sales, salesActive, 'Sales', [
              { to: `/${resolvedStoreId}/transactions`, label: 'Transactions' }, // Use resolvedStoreId here
              { to: '/suspended-sales', label: 'Suspended Sales' },
              { to: '/discounts', label: 'Discounts' },
              { to: '/pos', label: 'POS' },
              { to: '/import-sales', label: 'Import Sales' },
            ])}
            {renderDropdownMenu(
              'products',
              product,
              productActive,
              'Products',
              [
                { to: '/product-list', label: 'Product List' },
                { to: '/add-new-product', label: 'Add Product' },
                { to: '/print-product-labels', label: 'Print Product Labels' },
                { to: '/variations', label: 'Variations' },
                { to: '/units', label: 'Units' },
                { to: '/categories', label: 'Categories' },
                { to: '/import-products', label: 'Import Products' },
                { to: '/import-opening-stock', label: 'Import Opening Stock' },
              ],
            )}
            {renderNavLink('/invoices', purchases, purchases, 'Purchases')}
            {renderNavLink('/expenses', expenses, expenses, 'Expenses')}
            {renderNavLink(
              '/payment-account',
              payment,
              payment,
              'Payment Accounts',
            )}
            {renderNavLink('/contact', contact, contact, 'Contacts')}
            {renderNavLink('/report', report, report, 'Reports')}
          </ul>
        </div>

        <div className="nav-section">
          <div className="title">Settings</div>
          <ul>
            {renderNavLink('/settings', settings, settings, 'Settings')}
            {renderNavLink(
              '/notifications',
              notification,
              notification,
              'Notification',
            )}
            {renderNavLink('/logout', logout, logout, 'Logout')}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
