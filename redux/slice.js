import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = slice.actions;
export const userSlice = slice.reducer;
