import { useState } from "react";
import { Sparkles, Brain, ShieldCheck, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SymptomInput from "@/components/SymptomInput";
import PredictionResults from "@/components/PredictionResults";
import BMICalculator from "@/components/BMICalculator";
import LoadingSpinner from "@/components/LoadingSpinner";
import { predictDisease, PredictionResult } from "@/lib/prediction-engine";
import MedicalChatbot from "@/components/MedicalChatbot";

const Index = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async () => {
    if (symptoms.length === 0) return;
    setIsLoading(true);
    setResults([]);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1800));
    const predictions = predictDisease(symptoms);
    setResults(predictions);
    setIsLoading(false);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 px-6">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Health Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 animate-slide-up">
              Your{" "}
              <span className="text-gradient">Intelligent</span>
              <br />
              Symptom Checker
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-slide-up">
              Enter your symptoms and let our AI analyze potential conditions with confidence scores and recommended precautions.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="container mx-auto px-6 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Input + Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Symptom input card */}
              <div className="glass-strong rounded-2xl p-6 space-y-5">
                <SymptomInput selectedSymptoms={symptoms} onChange={setSymptoms} />

                <button
                  onClick={handlePredict}
                  disabled={symptoms.length === 0 || isLoading}
                  className="w-full py-3.5 rounded-xl gradient-hero text-primary-foreground font-display font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {isLoading ? "Analyzing..." : "🔍 Predict Possible Conditions"}
                </button>
              </div>

              {/* Results */}
              {isLoading && <LoadingSpinner />}
              {!isLoading && <PredictionResults results={results} />}
              {!isLoading && hasSearched && results.length === 0 && (
                <div className="glass rounded-2xl p-8 text-center animate-fade-in">
                  <p className="text-muted-foreground">
                    No strong matches found. Try adding more symptoms for a better analysis.
                  </p>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <BMICalculator />

              {/* Info cards */}
              <div className="glass rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h4 className="font-display font-semibold text-foreground text-sm">How It Works</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    Enter your symptoms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    AI analyzes patterns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    Get predictions & precautions
                  </li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-medical-green" />
                  <h4 className="font-display font-semibold text-foreground text-sm">Privacy First</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  All analysis happens locally in your browser. No health data is stored or transmitted.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-medical-amber-light border border-medical-amber/20">
                <AlertTriangle className="w-4 h-4 text-medical-amber flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  This tool is for <strong>educational purposes only</strong>. Always seek professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MedicalChatbot />
    </div>
  );
};

export default Index;
