import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authSignUpUser =
  ({ email, password, name, image }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, {
        displayName: name,
        photoURL: image,
      });
    } catch (error) {
      console.log(error.message, "error");
    }
  };

export const authSignInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (payload, { getState, rejectWithValue }) => {
    try {
      await signOut(getState().auth.user);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
