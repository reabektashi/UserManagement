import React from 'react';
import { ChangeEvent } from 'react';


export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void; }) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return <input className="input" placeholder="Search by name or email…" value={value} onChange={handle} />;
}
