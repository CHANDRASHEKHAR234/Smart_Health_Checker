import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { ALL_SYMPTOMS } from "@/lib/prediction-engine";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";

interface SymptomInputProps {
  selectedSymptoms: string[];
  onChange: (symptoms: string[]) => void;
}

const SymptomInput = ({ selectedSymptoms, onChange }: SymptomInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = useTranslations(language);

  useEffect(() => {
    const filtered = ALL_SYMPTOMS.filter(
      (s) =>
        s.includes(inputValue.toLowerCase()) &&
        !selectedSymptoms.includes(s)
    );
    setFilteredSymptoms(filtered);
  }, [inputValue, selectedSymptoms]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      onChange([...selectedSymptoms, symptom]);
    }
    setInputValue("");
  };

  const removeSymptom = (symptom: string) => {
    onChange(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const parts = inputValue.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      const newSymptoms = [...selectedSymptoms];
      parts.forEach((part) => {
        const match = ALL_SYMPTOMS.find((s) => s === part);
        if (match && !newSymptoms.includes(match)) {
          newSymptoms.push(match);
        }
      });
      onChange(newSymptoms);
      setInputValue("");
    }
  };

  return (
    <div className="w-full space-y-3" ref={dropdownRef}>
      <label className="block text-sm font-medium text-foreground">
        {t.enterSymptoms}
      </label>

      {selectedSymptoms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSymptoms.map((symptom) => (
            <Badge
              key={symptom}
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-accent text-accent-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {symptom}
              <X
                className="w-3 h-3 ml-2"
                onClick={() => removeSymptom(symptom)}
              />
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t.symptomPlaceholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform cursor-pointer ${isDropdownOpen ? "rotate-180" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>

      {isDropdownOpen && filteredSymptoms.length > 0 && (
        <div className="glass-strong rounded-xl max-h-48 overflow-y-auto animate-slide-up">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => addSymptom(symptom)}
              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-xl last:rounded-b-xl capitalize"
            >
              {symptom}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">{t.symptomHint}</p>
    </div>
  );
};

export default SymptomInput;
