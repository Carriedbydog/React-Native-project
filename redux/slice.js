import { createSlice } from "@reduxjs/toolkit";
import { authSignInUser, authSignUpUser } from "./operations";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(authSignUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(authSignInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(authSignInUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const userSlice = slice.reducer;
