import { Activity, Shield, Heart, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage, Language } from "@/hooks/useLanguage";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languageNames } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const languages: Language[] = ["en", "es", "hi", "fr"];

  return (
    <header className="w-full py-4 px-6 glass-strong sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">Smart Health AI</h1>
            <p className="text-xs text-muted-foreground">Symptom Checker</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Secure & Private</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mr-2">
            <Heart className="w-4 h-4 text-medical-green" />
            <span>AI-Powered</span>
          </div>

          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="h-9 px-3 rounded-lg flex items-center gap-1.5 bg-secondary text-secondary-foreground hover:bg-accent transition-colors text-sm font-medium"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-xl glass-strong shadow-lg overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                      language === lang
                        ? "text-primary font-semibold bg-accent/50"
                        : "text-foreground"
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
