// src/components/CapacityCard.tsx
import React from 'react';
import { FaUsers, FaHome, FaDoorClosed } from 'react-icons/fa';

interface CapacityCardProps {
  location: string;
  total: number;
  occupied: number;
  statusColor: string;
  icon: React.ReactNode;
}

export default function CapacityCard({
  location,
  total,
  occupied,
  statusColor,
  icon,
}: CapacityCardProps) {
  const percentage = Math.round((occupied / total) * 100);
  const remaining = total - occupied;

  let barColor = 'bg-green-400'; 
  if (percentage >= 75) {
    barColor = 'bg-yellow-400'; 
  }
  if (percentage >= 90) {
    barColor = 'bg-red-400'; 
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 transition-shadow hover:shadow-2xl h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-700 dark:text-gray-100 flex items-center">
          {icon}
          <span className="ml-2">{location.toUpperCase()} CAPACITY</span>
        </h3>
        <span className={`px-4 py-2 text-md font-extrabold text-white rounded-full ${statusColor}`}>
          {percentage}%
        </span>
      </div>

      <div className="mb-6 mt-4">
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
          <div
            className={`h-3 rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>  
      </div>

      {/* Increased font size for data points */}
      <div className="text-md grid grid-cols-3 gap-2 text-center border-t pt-4 mt-4 border-gray-100 dark:border-gray-700">
        <div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{total}</p>
          <p className="text-slate-500 dark:text-gray-400 flex items-center justify-center mt-1">
            <FaHome className="mr-1" /> Total
          </p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{occupied}</p>
          <p className="text-slate-500 dark:text-gray-400 flex items-center justify-center mt-1">
            <FaUsers className="mr-1" /> Occupied
          </p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{remaining}</p>
          <p className="text-slate-500 dark:text-gray-400 flex items-center justify-center mt-1">
            <FaDoorClosed className="mr-1" /> Available
          </p>
        </div>
      </div>
    </div>
  );
}