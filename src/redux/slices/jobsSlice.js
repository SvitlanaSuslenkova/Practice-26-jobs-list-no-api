import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import { setError } from "./errorSlice";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("...../src/data.json");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      dispatch(setError("Failed to fetch jobs"));
      return rejectWithValue(error.message);
    }
  }
);
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    filteredjobs: [],
    filters: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      if (!state.filters.includes(action.payload)) {
        state.filters.push(action.payload);
      }
      state.filteredjobs = state.jobs.filter((job) => {
        const details = [job.role, job.level, ...job.languages, ...job.tools];
        return state.filters.every((filter) => details.includes(filter));
      });
    },
    clearFilters: (state) => {
      state.filters = [];
      state.filteredjobs = state.jobs;
    },
    clearThisFilter: (state, action) => {
      state.filters = state.filters.filter(
        (filter) => filter !== action.payload
      );
      if (state.filters.length > 0) {
        state.filteredjobs = state.jobs.filter((job) => {
          const details = [job.role, job.level, ...job.languages, ...job.tools];
          return state.filters.every((filter) => details.includes(filter));
        });
      } else {
        state.filteredjobs = state.jobs;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
        state.filteredjobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilters, clearThisFilter } = jobsSlice.actions;
export default jobsSlice.reducer;
