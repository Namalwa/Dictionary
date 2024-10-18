import { create } from 'zustand';

const useDictionaryStore = create((set) => ({
  word: '',
  definitions: [],
  error: null,
  setWord: (word) => set({ word }),
  fetchDefinitions: async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      set({ definitions: data, error: null });
    } catch (error) {
      set({ error: 'Word not found', definitions: [] });
    }
  },
}));

export default useDictionaryStore;
