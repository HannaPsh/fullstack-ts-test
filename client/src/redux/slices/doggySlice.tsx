import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IState } from "../../types";
import * as api from "../api";

const initialState: IState = {
  favorites: [],
  error: "",
  loading: false,
};

export const addToFavorite = createAsyncThunk(
  "/newFavorites",
  async (item: { breed: string; image: string }, { rejectWithValue }) => {
    try {
      const response = await api.addToFavorite(item);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const seeAllFavorites = createAsyncThunk("/favorites", async () => {
  try {
    const response = await api.fetchAllFavorites();
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
});

export const deleteFavorite = createAsyncThunk(
  "/deletea/",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      return response.data.favorite;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const resetStateReducer = (state: IState) => {
  state.favorites = [];
  state.error = "";
  state.loading = false;
};
const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    cleanStore: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorite.pending, (state: IState) => {
        state.loading = true;
      })
      .addCase(addToFavorite.fulfilled, (state: IState, action) => {
        state.loading = false;
        state.error = "";
        state.favorites?.push(action.payload);
      })
      .addCase(addToFavorite.rejected, (state: IState, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(seeAllFavorites.pending, (state: IState) => {
        state.loading = true;
      })
      .addCase(seeAllFavorites.fulfilled, (state: IState, action) => {
        state.loading = false;
        state.error = "";
        state.favorites = action.payload.favorites;
      })
      .addCase(seeAllFavorites.rejected, (state: IState, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.pending, (state: IState) => {
        state.loading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state: IState, action) => {
        state.loading = false;
        state.error = "";

        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload._id
        );
      });
  },
});
export const { cleanStore } = dogSlice.actions;
export default dogSlice.reducer;