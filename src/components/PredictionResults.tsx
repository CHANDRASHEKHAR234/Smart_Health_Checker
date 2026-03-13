import { PredictionResult } from "@/lib/prediction-engine";
import { AlertTriangle, Shield, Stethoscope, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";
import { getTranslatedDisease } from "@/lib/medical-translations";

interface PredictionResultsProps {
  results: PredictionResult[];
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 70) return "text-medical-green";
  if (confidence >= 40) return "text-medical-amber";
  return "text-muted-foreground";
};

const getConfidenceBarColor = (confidence: number) => {
  if (confidence >= 70) return "bg-medical-green";
  if (confidence >= 40) return "bg-medical-amber";
  return "bg-muted-foreground";
};

const PredictionResults = ({ results }: PredictionResultsProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  if (results.length === 0) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-display font-semibold text-foreground">{t.predictionResults}</h3>
      </div>

      {results.map((result, index) => {
        const translated = getTranslatedDisease(result.disease, language);

        return (
          <div
            key={result.disease}
            className="glass rounded-2xl p-5 space-y-4 animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <TrendingUp className="w-4 h-4 text-primary" />}
                  <h4 className="font-display font-semibold text-foreground text-lg">{translated.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{translated.description || result.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-2xl font-display font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence}%
                </span>
                <p className="text-xs text-muted-foreground">{t.confidence}</p>
              </div>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getConfidenceBarColor(result.confidence)}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t.recommendedPrecautions}</span>
              </div>
              <ul className="space-y-1.5">
                {(translated.precautions.length > 0 ? translated.precautions : result.precautions).map((precaution, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      <div className="flex items-start gap-3 p-4 rounded-xl bg-medical-amber-light border border-medical-amber/20">
        <AlertTriangle className="w-5 h-5 text-medical-amber flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">{t.disclaimer}</p>
          <p className="text-xs text-muted-foreground">{t.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
