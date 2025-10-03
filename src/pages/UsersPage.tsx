import React from 'react';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers } from '../features/users/usersSlice';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import UserTable from '../components/UserTable';
import AddUserForm from '../components/AddUserForm';
import { SortKey, SortOrder } from '../types';


export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((s: RootState) => s.users);

  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;
    if (q) list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    const dir = sortOrder === 'asc' ? 1 : -1;
    return [...list].sort((a,b) => String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')) * dir);
  }, [items, query, sortKey, sortOrder]);

  return (
    <div className="stack">
      <AddUserForm />

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <SortControls sortKey={sortKey} sortOrder={sortOrder} onChange={(k,o)=>{setSortKey(k); setSortOrder(o);}} />
        <div className="badge">{filteredSorted.length} users</div>
      </div>

      {status === 'loading' && <div className="card">Loading users…</div>}
      {status === 'failed'  && <div className="card">Error: {error}</div>}
      {status === 'succeeded' && <UserTable users={filteredSorted} />}
    </div>
  );
}
