import { PredictionResult } from "@/lib/prediction-engine";
import { AlertTriangle, Shield, Stethoscope, TrendingUp } from "lucide-react";

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
  if (results.length === 0) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-display font-semibold text-foreground">
          Prediction Results
        </h3>
      </div>

      {results.map((result, index) => (
        <div
          key={result.disease}
          className="glass rounded-2xl p-5 space-y-4 animate-slide-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {/* Disease name & confidence */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {index === 0 && (
                  <TrendingUp className="w-4 h-4 text-primary" />
                )}
                <h4 className="font-display font-semibold text-foreground text-lg">
                  {result.disease}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {result.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-2xl font-display font-bold ${getConfidenceColor(result.confidence)}`}>
                {result.confidence}%
              </span>
              <p className="text-xs text-muted-foreground">confidence</p>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getConfidenceBarColor(result.confidence)}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>

          {/* Precautions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Recommended Precautions
              </span>
            </div>
            <ul className="space-y-1.5">
              {result.precautions.map((precaution, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {precaution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-medical-amber-light border border-medical-amber/20">
        <AlertTriangle className="w-5 h-5 text-medical-amber flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Disclaimer</p>
          <p className="text-xs text-muted-foreground">
            This tool is for educational purposes only. It does not replace professional medical advice.
            Always consult a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
