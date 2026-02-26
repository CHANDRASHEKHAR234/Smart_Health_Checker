import { Activity, Heart } from "lucide-react";

const Footer = () => (
  <footer className="w-full py-6 px-6 border-t border-border mt-12">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Activity className="w-4 h-4 text-primary" />
        <span>Smart Health AI – Symptom Checker</span>
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        Developed with <Heart className="w-3 h-3 text-destructive" /> by
        <span className="font-medium text-foreground">Chandra Shekhar</span>
        – AI/ML Engineer
      </p>
    </div>
  </footer>
);

export default Footer;
