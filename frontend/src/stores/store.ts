import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import brandsSlice from "./brands/brandsSlice";
import datasetsSlice from "./datasets/datasetsSlice";
import generationsSlice from "./generations/generationsSlice";
import imagesSlice from "./images/imagesSlice";
import modelsSlice from "./models/modelsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
brands: brandsSlice,
datasets: datasetsSlice,
generations: generationsSlice,
images: imagesSlice,
models: modelsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
