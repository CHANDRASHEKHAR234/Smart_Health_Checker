import { Activity, Shield, Heart } from "lucide-react";

const Header = () => {
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
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Secure & Private</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-medical-green" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
