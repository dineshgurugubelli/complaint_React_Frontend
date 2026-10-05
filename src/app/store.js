import { configureStore } from "@reduxjs/toolkit";
import importantReducer, {
  IMPORTANT_STORAGE_KEY,
} from "../features/importantSlice";

export const store = configureStore({
  reducer: {
    important: importantReducer,
  },
});

// Persist important complaints so they survive a page refresh.
store.subscribe(() => {
  try {
    localStorage.setItem(
      IMPORTANT_STORAGE_KEY,
      JSON.stringify(store.getState().important)
    );
  } catch {
    // Storage may be unavailable (private mode / quota); the app still works.
  }
});
