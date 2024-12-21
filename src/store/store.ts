import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { globalSlice } from "./slice/globalSlice";
import { authApi } from "../service/auth";
import { authSlice } from "./slice/authSlice";
import { kybApi } from "../service/kyb";

const rootReducers = combineReducers({
  global: globalSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [kybApi.reducerPath]: kybApi.reducer,
});

const persistConfig = {
  key: "alert-business",
  storage,
};

export type RootReducer = ReturnType<typeof rootReducers>;

const persistedReducer = persistReducer<RootReducer, AnyAction>(
  persistConfig,
  rootReducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, kybApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
