// src/components/SarReportsTable.tsx
'use client';

import React, { useState } from 'react';
import { FaMapPin, FaSearch, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface SarReport {
  id: number;
  area: string;
  status: 'Active' | 'Resolved' | 'Critical';
  priority: 'High' | 'Medium' | 'Low';
  incident: string;
  timestamp: string;
}

const mockReports: SarReport[] = [
  { id: 101, area: 'North Sector', status: 'Critical', priority: 'High', incident: 'Missing hiker, rough terrain', timestamp: '02:05 PM' },
  { id: 102, area: 'Downtown Center', status: 'Active', priority: 'Medium', incident: 'Flooding basement rescue', timestamp: '01:45 PM' },
  { id: 103, area: 'West Industrial', status: 'Resolved', priority: 'Low', incident: 'Fallen tree, minor road blockage', timestamp: '12:30 PM' },
  { id: 104, area: 'East Valley', status: 'Active', priority: 'High', incident: 'Stranded vehicle, flash flood area', timestamp: '11:15 AM' },
  { id: 105, area: 'North Sector', status: 'Active', priority: 'Medium', incident: 'Power outage check, elderly resident', timestamp: '09:00 AM' },
];

const getStatusStyles = (status: SarReport['status']) => {
  switch (status) {
    case 'Critical':
      return 'bg-red-400 text-white';
    case 'Active':
      return 'bg-yellow-300 text-black';
    case 'Resolved':
      return 'bg-green-400 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

export default function SarReportsTable() {
  const [reports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report =>
    report.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.incident.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 transition-shadow hover:shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-700 dark:text-gray-100 flex items-center">
          <FaSearch className="mr-3 text-red-400" /> SAR INCIDENTS
        </h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 pl-10 border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {['ID', 'Area', 'Incident', 'Priority', 'Status', 'Time'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-sm font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition duration-150"> 
                <td className="px-6 py-4 whitespace-nowrap text-md font-extrabold text-slate-900 dark:text-white">
                  #{report.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-slate-600 dark:text-gray-300 flex items-center">
                  <FaMapPin className="mr-2 text-indigo-400" /> {report.area}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-slate-900 dark:text-white">
                  {report.incident}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md font-semibold">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${report.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'}`}>
                    {report.priority.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md">
                  <span className={`px-4 py-1 inline-flex text-sm leading-5 font-bold rounded-full ${getStatusStyles(report.status)}`}>
                    {report.status === 'Resolved' ? <FaCheckCircle className="inline mr-1" /> : <FaExclamationCircle className="inline mr-1" />}
                    {report.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-slate-500 dark:text-gray-300">
                  {report.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}