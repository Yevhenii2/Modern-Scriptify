import { configureStore } from "@reduxjs/toolkit";

import scriptsReducer from "./scriptsSlice";

const store = configureStore({
  reducer: {
    scripts: scriptsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
