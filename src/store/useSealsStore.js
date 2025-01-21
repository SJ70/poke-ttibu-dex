import { create } from 'zustand';

const useSealsStore = create((set) => ({
  serverSeals: [],
  clientSeals: [],
  setServerSeals: (seals) => set((state) => ({ serverSeals: seals })),
  setClientSeals: (seals) => set((state) => ({ clientSeals: seals })),
}));

export default useSealsStore;