import React from 'react';
import { SortKey, SortOrder } from '../types';


export default function SortControls({ sortKey, sortOrder, onChange }: {
  sortKey: SortKey; sortOrder: SortOrder; onChange: (k: SortKey, o: SortOrder) => void;
}) {
  return (
    <div className="row" style={{gap:12}}>
      <select className="select" value={sortKey} onChange={e => onChange(e.target.value as SortKey, sortOrder)}>
        <option value="name">Sort: Name</option>
        <option value="email">Sort: Email</option>
      </select>
      <select className="select" value={sortOrder} onChange={e => onChange(sortKey, e.target.value as SortOrder)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}
