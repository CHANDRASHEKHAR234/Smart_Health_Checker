import { Activity } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";

const LoadingSpinner = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-muted" />
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent absolute inset-0 animate-spin" />
        <Activity className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse-soft" />
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-foreground">{t.analyzingSymptoms}</p>
        <p className="text-sm text-muted-foreground">{t.processingInput}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
