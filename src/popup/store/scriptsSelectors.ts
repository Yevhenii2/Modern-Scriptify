import { RootState } from "./index";

export const getScriptById = (id?: string) => (state: RootState) =>
  id ? state.scripts.scripts.find(script => script.id === id) : null;

export const getScriptByUrl = (url: string) => (state: RootState) =>
  state.scripts.scripts.find(script => script.url === url);
