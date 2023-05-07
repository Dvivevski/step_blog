import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const persistConfig = {
  key: "blog_app",
  storage,
};

const persistReducers = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistReducers,
  devTools: process.env.NODE_ENV === "production",
  middleware: [thunk],
});

export default store;
