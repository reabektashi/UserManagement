import React from 'react';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addUserLocal } from '../features/users/usersSlice';


export default function AddUserForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError('Name and Email are required'); return; }
    setError('');
    dispatch(addUserLocal({ name: name.trim(), email: email.trim(), company: company ? { name: company.trim() } : undefined }));
    setName(''); setEmail(''); setCompany('');
  };

  return (
    <form onSubmit={onSubmit} className="card stack" aria-label="Add new user form">
      <h2>Add New User (Local)</h2>
      {error && <div className="badge" role="alert">{error}</div>}
      <div className="grid-2">
        <input className="input" placeholder="Name *" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email *" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <input className="input" placeholder="Company (optional)" value={company} onChange={e=>setCompany(e.target.value)} />
      <button className="button" type="submit">Add User</button>
    </form>
  );
}
