// src/components/MapSearchUI.tsx
'use client';

import React, { useState } from 'react';
import { FaRoute, FaTimes } from 'react-icons/fa';

interface SearchUIProps {
  startAddress: string;
  endAddress: string;
  routeInstructions: string | null;
  onSearch: (start: string, end: string) => void;
  onClear: () => void;
}

export default function MapSearchUI({ startAddress, endAddress, routeInstructions, onSearch, onClear }: SearchUIProps) {
  const [startInput, setStartInput] = useState(startAddress);
  const [endInput, setEndInput] = useState(endAddress);

  const handleSearch = () => {
    if (startInput.trim() && endInput.trim()) {
      onSearch(startInput, endInput);
    }
  };

  const statusText = routeInstructions || "Enter start and end locations.";

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-white shadow-2xl rounded-b-2xl">
      <div className="flex flex-col space-y-3">
        
        {/* Input Fields */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Start Location (e.g., Your Home Address)"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500"
          />
          <input
            type="text"
            placeholder="Destination (Emergency Center)"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:ring-red-500 focus:border-red-500"
            disabled
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center space-x-3">
          <button
            onClick={handleSearch}
            className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition duration-200 disabled:opacity-50"
            disabled={!startInput.trim() || !endInput.trim()}
          >
            <FaRoute className="mr-2" /> Get Route
          </button>
          
          <button
            onClick={onClear}
            className="flex items-center justify-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-semibold rounded-lg transition duration-200"
          >
            <FaTimes className="mr-2" /> Clear
          </button>
        </div>

        {/* Status Panel */}
        <div className={`p-3 rounded-lg text-sm font-medium ${routeInstructions ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-50 text-gray-600'}`}>
          {statusText}
        </div>
      </div>
    </div>
  );
}