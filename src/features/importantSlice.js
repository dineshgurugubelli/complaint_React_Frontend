import { createSlice } from "@reduxjs/toolkit";

export const IMPORTANT_STORAGE_KEY = "important";

function loadImportant() {
  try {
    const saved = JSON.parse(localStorage.getItem(IMPORTANT_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const importantSlice = createSlice({
  name: "important",
  initialState: loadImportant(),
  reducers: {
    addImportant: (state, action) => {
      const exists = state.find(
        (complaint) => complaint.id === action.payload.id
      );
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeImportant: (state, action) => {
      return state.filter((complaint) => complaint.id !== action.payload);
    },
  },
});

export const { addImportant, removeImportant } = importantSlice.actions;
export default importantSlice.reducer;
