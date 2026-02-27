import { Activity, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  return (
    <footer className="w-full py-6 px-6 border-t border-border mt-12">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4 text-primary" />
          <span>{t.footerApp}</span>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          {t.developedWith} <Heart className="w-3 h-3 text-destructive" />
          <span className="font-medium text-foreground">{t.developerName}</span>
          {t.developerTitle}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
