import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/jobsSlice";
import ErrorReducer from "./slices/errorSlice";

const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    error: ErrorReducer,
  },
});
export default store;
