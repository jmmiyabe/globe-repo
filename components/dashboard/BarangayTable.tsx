'use client';
import { useEffect, useState } from 'react';

export default function BarangayTable() {
  const [barangays, setBarangays] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(
      "https://portal.georisk.gov.ph/arcgis/rest/services/PSA/Barangay/MapServer/4/query?where=city_name='Pasay'&outFields=brgy_name,brgy_code,psgc_10d&returnGeometry=false&f=json"
    )
      .then(res => res.json())
      .then(data => setBarangays(data.features.map((f: any) => f.attributes)));
  }, []);

  const filtered = barangays.filter(b => b.brgy_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Search barangay..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Barangay</th>
            <th>Code</th>
            <th>PSGC</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, 10).map((b, i) => (
            <tr key={i}>
              <td>{b.brgy_name}</td>
              <td>{b.brgy_code}</td>
              <td>{b.psgc_10d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
