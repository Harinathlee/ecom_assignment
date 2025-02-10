// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';



const initialState: User = {
  name: '',
  email: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, phone } = action.payload;
      state = { name, email, phone };
    },
   
  },
});

export const { setUser  } = userSlice.actions;
export default userSlice.reducer;