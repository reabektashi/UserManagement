import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { deleteUserLocal } from '../features/users/usersSlice';


export default function UserTable({ users }: { users: User[] }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Company</th><th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.email}</td>
              <td>{u.company?.name ?? '—'}</td>
              <td style={{textAlign:'right'}}>
                <Link className="button secondary" to={`/users/${u.id}`} style={{marginRight:8}}>Edit</Link>
                <button className="button" onClick={()=>dispatch(deleteUserLocal(u.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
