import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment'; // Make sure to install and import moment.js
import {
  salesActive,
  wallet,
  walletExpenses,
  walletPurchases,
  ExportIcon,
} from '../../../assets/images/icons';
import './home.scss';
import FinancialGraph from './financial-graph';
import SaleTables from './sales-table';
import axios from '../../../utils/axios';
import { monthlyData, dailyData } from './home-data';

const Home = () => {
  const [filter, setFilter] = useState('months');
  const [transactions, setTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState('today');
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch storeId from local storage
  const storeId = localStorage.getItem('storeId');

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!storeId) {
        setApiError('Store ID is missing in local storage');
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`/${storeId}/transactions`);
        setTransactions(response.data.data || []);
        setApiError(null);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setApiError('Failed to fetch transactions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [storeId]);

  // Calculate metrics
  const calculateMetrics = (transactions, timeRange) => {
    const now = moment();
    const filterDate = {
      today: now.startOf('day'),
      last_week: now.subtract(1, 'week').startOf('day'),
      last_month: now.subtract(1, 'month').startOf('day'),
    }[timeRange];

    const filteredTransactions = transactions.filter((t) =>
      moment(t.createdAt).isAfter(filterDate),
    );
    const previousTransactions = transactions.filter((t) =>
      moment(t.createdAt).isBetween(
        filterDate.clone().subtract(1, timeRange),
        filterDate,
      ),
    );

    const currentTotal = filteredTransactions.reduce(
      (acc, t) => acc + t.amount,
      0,
    );
    const previousTotal = previousTransactions.reduce(
      (acc, t) => acc + t.amount,
      0,
    );

    const salesPercentage = previousTransactions.length
      ? (
          ((filteredTransactions.length - previousTransactions.length) /
            previousTransactions.length) *
          100
        ).toFixed(2)
      : '100.00';

    const incomePercentage = previousTotal
      ? (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(2)
      : '100.00';

    return {
      totalSales: filteredTransactions.length,
      totalIncome: currentTotal,
      salesPercentage: `${salesPercentage > 0 ? '+' : ''}${salesPercentage}%`,
      incomePercentage: `${
        incomePercentage > 0 ? '+' : ''
      }${incomePercentage}%`,
    };
  };

  const { totalSales, totalIncome, salesPercentage, incomePercentage } =
    useMemo(
      () => calculateMetrics(transactions, timeRange),
      [transactions, timeRange],
    );

  const formattedTotalIncome = totalIncome.toFixed(2);

  const handleTimeRangeChange = (id, newTimeRange) => {
    // Time range logic for each metric
  };

  const metricsInfo = [
    {
      id: 1,
      icon: salesActive,
      title: 'Number of sales',
      value: totalSales,
      percentage: salesPercentage,
      timeRange: 'today',
    },
    {
      id: 2,
      icon: wallet,
      title: 'Total income',
      value: formattedTotalIncome,
      percentage: incomePercentage,
      timeRange: 'today',
    },
    {
      id: 3,
      icon: walletExpenses,
      title: 'Total purchases',
      value: 123,
      percentage: '+1.20%',
      timeRange: 'today',
    },
    {
      id: 4,
      icon: walletPurchases,
      title: 'Total expenses',
      value: 123,
      percentage: '-1.20%',
      timeRange: 'today',
    },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const paginatedTransactions = useMemo(
    () => transactions.slice(0, 300),
    [transactions],
  );

  return (
    <div className="home-container">
      <div className="metrics-container">
        {metricsInfo.map((metricInfo) => (
          <div className="card" key={metricInfo.id}>
            <div className="wrapper">
              <div className="icon">
                <img src={metricInfo.icon} alt="" />
              </div>
              <select
                value={metricInfo.timeRange}
                onChange={(e) =>
                  handleTimeRangeChange(metricInfo.id, e.target.value)
                }
              >
                <option value="today">Today</option>
                <option value="last_week">Last 1 Week</option>
                <option value="last_month">Last 1 Month</option>
              </select>
            </div>
            <div className="title">{metricInfo.title}</div>


            <div className="value-container">
              <div className="value">{metricInfo.value}</div>
              <div
                id={
                  metricInfo.percentage.startsWith('+')
                    ? 'positive'
                    : 'negative'
                }
              >
                {metricInfo.percentage}
              </div>
            </div>
          </div>
        ))}
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

        <FinancialGraph data={filter === 'months' ? monthlyData : dailyData} />
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
        <SaleTables transactions={paginatedTransactions} storeId={storeId} />
      </div>
    </div>
  );
};

export default Home;
