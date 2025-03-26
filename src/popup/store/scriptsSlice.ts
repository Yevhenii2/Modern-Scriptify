import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

import { Script } from "../types/Scripts";

import { RootState } from ".";

const STORAGE_KEY = "scripts";

const loadFromChromeStorage = async(): Promise<Script[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([ STORAGE_KEY ], (result) => {
      if (chrome.runtime.lastError) {
        console.warn("Failed to load scripts from chrome.storage.local", chrome.runtime.lastError);
        resolve([]);

        return;
      }

      const raw = result[STORAGE_KEY];
      try {
        resolve(raw ? JSON.parse(raw) : []);
      } catch {
        console.warn("Failed to parse scripts from chrome.storage.local");
        resolve([]);
      }
    });
  });
};

const saveToChromeStorage = (scripts: Script[]) => {
  chrome.storage.local.set({ [STORAGE_KEY]: JSON.stringify(scripts) }, () => {
    if (chrome.runtime.lastError) {
      console.warn("Failed to save scripts to chrome.storage.local", chrome.runtime.lastError);
    }
  });
};

interface ScriptsState {
  scripts: Script[];
}

const initialState: ScriptsState = {
  scripts: [],
};

const scriptsSlice = createSlice({
  name: "scripts",
  initialState,
  reducers: {
    addScript: (state, action: PayloadAction<Script>) => {
      state.scripts.push(action.payload);
      saveToChromeStorage(state.scripts);
    },
    editScript: (state, action: PayloadAction<Script>) => {
      const index = state.scripts.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.scripts[index] = action.payload;
        saveToChromeStorage(state.scripts);
      }
    },
    removeScript: (state, action: PayloadAction<string>) => {
      state.scripts = state.scripts.filter(script => script.id !== action.payload);
      saveToChromeStorage(state.scripts);
    },
    setScripts: (state, action: PayloadAction<Script[]>) => {
      state.scripts = action.payload;
      saveToChromeStorage(state.scripts);
    },
  },
});

export const {
  addScript,
  editScript,
  removeScript,
  setScripts,
} = scriptsSlice.actions;

export default scriptsSlice.reducer;

export const loadScripts = (): ThunkAction<Promise<void>, RootState, unknown, any> => async(dispatch) => {
  const scripts = await loadFromChromeStorage();

  dispatch(setScripts(scripts || []));
};