import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { getPersistConfig } from 'redux-deep-persist';

import { usersApi } from "./usersApi";
import { followersReducer } from "./followers/followersSlice";

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    followers: followersReducer,
});

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    blacklist: ['config', 'mutations', 'provided', 'queries', 'subscriptions', 'usersApi'],
    rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersApi.middleware),
});

export const persistor = persistStore(store);