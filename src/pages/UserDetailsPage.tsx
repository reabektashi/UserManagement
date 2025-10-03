import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useMemo, useState } from 'react';
import { deleteUserLocal, updateUserLocal } from '../features/users/usersSlice';
import type { User } from '../types';


export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.users.items.find(u => String(u.id) === String(id)));

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<User | null>(user ?? null);

  const addressStr = useMemo(() => {
    if (!user?.address) return '—';
    const a = user.address; return `${a.street}, ${a.suite}, ${a.city} ${a.zipcode}`;
  }, [user]);

  if (!user) return <div className="card">User not found.</div>;

  const onDelete = () => { dispatch(deleteUserLocal(user.id)); navigate('/'); };
  const onSave = () => {
    if (!form) return;
    if (!form.name?.trim() || !form.email?.trim()) return alert('Name and Email are required');
    dispatch(updateUserLocal({ ...user, ...form }));
    setEdit(false);
  };

  return (
    <div className="stack">
      <div className="card stack">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2>{user.name}</h2>
          <div className="row">
            {!edit && <button className="button secondary" onClick={()=>setEdit(true)}>Edit</button>}
            {edit && <button className="button" onClick={onSave}>Save</button>}
            <button className="button" onClick={onDelete}>Delete</button>
          </div>
        </div>

        {!edit ? (
          <div className="grid-2">
            <div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Phone:</strong> {user.phone ?? '—'}</div>
              <div><strong>Website:</strong> {user.website ? <a href={`https://${user.website}`} target="_blank">{user.website}</a> : '—'}</div>
            </div>
            <div>
              <div><strong>Company:</strong> {user.company?.name ?? '—'}</div>
              <div><strong>Address:</strong> {addressStr}</div>
            </div>
          </div>
        ) : (
          <div className="grid-2">
            <input className="input" placeholder="Name *" value={form?.name ?? ''} onChange={e=>setForm(f=>({...f!, name:e.target.value}))} />
            <input className="input" placeholder="Email *" value={form?.email ?? ''} onChange={e=>setForm(f=>({...f!, email:e.target.value}))} />
            <input className="input" placeholder="Phone" value={form?.phone ?? ''} onChange={e=>setForm(f=>({...f!, phone:e.target.value}))} />
            <input className="input" placeholder="Website" value={form?.website ?? ''} onChange={e=>setForm(f=>({...f!, website:e.target.value}))} />
          </div>
        )}
      </div>
    </div>
  );
}
