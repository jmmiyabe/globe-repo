// src/components/DynamicMapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicMap = dynamic(() => import('./EmergencyMap'), {
  ssr: false, 
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-3xl text-xl font-semibold">
      Loading Emergency Map...
    </div>
  ),
});

export default function DynamicMapWrapper() {
  return (
    <DynamicMap />
  );
}