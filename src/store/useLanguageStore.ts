import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        set({ language: lang });
      },
      toggleLanguage: () => set((state) => {
        const newLang = state.language === 'en' ? 'ar' : 'en';
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
        return { language: newLang };
      }),
    }),
    {
      name: 'georeo-language',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);
