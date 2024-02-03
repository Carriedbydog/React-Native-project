import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    emailVerified: null,
  },
  posts: [],
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
