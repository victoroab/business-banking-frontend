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
import { dashboardSlice } from "./slice/dashboardSlice";
import { beneficiaryApi } from "../service/beneficiary";
import { transactionApi } from "../service/transaction";
import { accountApi } from "../service/account";

const rootReducers = combineReducers({
  global: globalSlice.reducer,
  auth: authSlice.reducer,
  dashboard: dashboardSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [kybApi.reducerPath]: kybApi.reducer,
  [beneficiaryApi.reducerPath]: beneficiaryApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
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
    }).concat(
      authApi.middleware,
      kybApi.middleware,
      beneficiaryApi.middleware,
      transactionApi.middleware,
      accountApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
