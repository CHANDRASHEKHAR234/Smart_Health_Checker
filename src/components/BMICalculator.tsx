import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = useTranslations(language);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi(Math.round((w / (h * h)) * 10) / 10);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: t.underweight, color: "text-medical-blue" };
    if (bmi < 25) return { label: t.normal, color: "text-medical-green" };
    if (bmi < 30) return { label: t.overweight, color: "text-medical-amber" };
    return { label: t.obese, color: "text-destructive" };
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">{t.bmiCalculator}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">{t.height}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">{t.weight}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {t.calculateBMI}
      </button>

      {bmi !== null && (
        <div className="text-center p-4 rounded-xl bg-muted animate-slide-up">
          <p className="text-3xl font-display font-bold text-foreground">{bmi}</p>
          <p className={`text-sm font-medium ${getBMICategory(bmi).color}`}>
            {getBMICategory(bmi).label}
          </p>
        </div>
      )}

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <span>{t.bmiNote}</span>
      </div>
    </div>
  );
};

export default BMICalculator;
