import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "es" | "hi" | "fr";

const LABELS: Record<Language, string> = {
  en: "EN",
  es: "ES",
  hi: "HI",
  fr: "FR",
};

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  es: "Español",
  hi: "हिन्दी",
  fr: "Français",
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
  labels: typeof LABELS;
  languageNames: typeof LANGUAGE_NAMES;
}>({
  language: "en",
  setLanguage: () => {},
  labels: LABELS,
  languageNames: LANGUAGE_NAMES,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, labels: LABELS, languageNames: LANGUAGE_NAMES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
