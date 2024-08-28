import React, { useState, useMemo } from 'react';
import {
  salesActive,
  wallet,
  walletExpenses,
  walletPurchases,
  dropdownIcon,
  ExportIcon,
} from '../../../assets/images/icons';
import './home.scss';
import FinancialGraph from './financial-graph';
import SaleTables from './sales-table';
import { monthlyData, dailyData, transactions } from './home-data';

const Home = () => {
  const [filter, setFilter] = useState('months');
  const data = filter === 'months' ? monthlyData : dailyData;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const paginatedTransactions = useMemo(() => {
    const startIndex = 0;
    return transactions.slice(startIndex, startIndex + 300);
  }, [transactions]);

  const metricsInfo = [
    {
      id: 1,
      icon: salesActive,
      title: 'Number of sales',
      value: 123,
      percentage: '+1.20%',
    },
    {
      id: 2,
      icon: wallet,
      title: 'Total income',
      value: 123,
      percentage: '-1.20%',
    },
    {
      id: 3,
      icon: walletExpenses,
      title: 'Total purchases',
      value: 123,
      percentage: '+1.20%',
    },
    {
      id: 4,
      icon: walletPurchases,
      title: 'Total expenses',
      value: 123,
      percentage: '-1.20%',
    },
  ];
  return (
    <div className="home-container">
      <div className="metrics-container">
        {metricsInfo.map((metricInfo) => {
          const rateId = metricInfo.percentage.startsWith('+')
            ? 'positive'
            : 'negative';

          return (
            <div className="card" key={metricInfo.id}>
              <div className="wrapper">
                <div className="icon">
                  <img src={metricInfo.icon} alt="" />
                </div>

                <div className="select-date">
                  Today
                  <img src={dropdownIcon} alt="" />
                </div>
              </div>

              <div className="title">{metricInfo.title}</div>

              <div className="value-container">
                <div className="value">{metricInfo.value}</div>
                <div id={rateId}>{metricInfo.percentage}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="financial-overview-container">
        <div className="title">
          <h4>Financial Overview</h4>

          <div className="cta-filter">
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="months">Sales</option>
              <option value="days">Last 12 Days</option>
            </select>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="months">Last 12 Months</option>
              <option value="days">Last 12 Days</option>
            </select>
          </div>
        </div>

        <FinancialGraph data={data} />
      </div>

      <div className="today-sales-container financial-overview-container">
        <div className="title">
          <h4>Today Sales</h4>

          <div className="cta-filter">
            <button>
              <img src={ExportIcon} alt="" />
              Export today sales
            </button>
          </div>
        </div>

        <SaleTables />
      </div>
    </div>
  );
};

export default Home;
