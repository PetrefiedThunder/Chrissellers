import { create } from 'zustand';

type Section = 'hero' | 'work' | 'impact' | 'contact';

interface ViewState {
  currentSection: Section;
  setSection: (section: Section) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  currentSection: 'hero',
  setSection: (section) => set({ currentSection: section }),
}));
