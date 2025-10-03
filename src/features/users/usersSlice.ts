import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { fetchUsersApi } from '../../api';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UsersState {
  items: User[];
  status: Status;
  error?: string;
}

const initialState: UsersState = { items: [], status: 'idle' };


export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const data = await fetchUsersApi();
  return data as User[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserLocal: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const id = Date.now();
      state.items = [{ id, ...action.payload }, ...state.items];
    },
    updateUserLocal: (state, action: PayloadAction<User>) => {
      const i = state.items.findIndex(u => u.id === action.payload.id);
      if (i !== -1) state.items[i] = action.payload;
    },
    deleteUserLocal: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(u => u.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; state.error = undefined; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; });
  }
});

export const { addUserLocal, updateUserLocal, deleteUserLocal } = usersSlice.actions;
export default usersSlice.reducer;
