import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authSignUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, name, image }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name, photoURL: image });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// export const authStateChange = createAsyncThunk(
//   "auth/authStateChange",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const user = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           dispatch(authSignInUser(user));
//         } else {
//           dispatch(authSignOutUser());
//         }
//       });
//       return user;
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   }
// );

export const authStateChange = createAsyncThunk(
  "auth/authStateChange",
  (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(authSignInUser(user));
          resolve(user);
        } else {
          dispatch(authSignOutUser());
          reject("No user signed in");
        }
      });
    });
  }
);
