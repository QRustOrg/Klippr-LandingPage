"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = localStorage.getItem("klippr-locale") as Locale | null;
    if (stored === "es" || stored === "en") {
      setLocaleState(stored);
    } else if (navigator.language.startsWith("en")) {
      setLocaleState("en");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("klippr-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dict: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}
