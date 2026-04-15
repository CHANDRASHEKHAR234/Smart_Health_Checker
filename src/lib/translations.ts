import { Language } from "@/hooks/useLanguage";

type TranslationKeys = {
  // Header
  appName: string;
  subtitle: string;
  securePrivate: string;
  aiPowered: string;

  // Hero
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDescription: string;

  // Symptom Input
  enterSymptoms: string;
  symptomPlaceholder: string;
  symptomHint: string;

  // Predict button
  analyzing: string;
  predictButton: string;

  // Results
  predictionResults: string;
  confidence: string;
  recommendedPrecautions: string;
  noMatchFound: string;

  // Disclaimer
  disclaimer: string;
  disclaimerText: string;
  educationalOnly: string;

  // BMI
  bmiCalculator: string;
  height: string;
  weight: string;
  calculateBMI: string;
  bmiNote: string;
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;

  // How it works
  howItWorks: string;
  step1: string;
  step2: string;
  step3: string;

  // Privacy
  privacyFirst: string;
  privacyText: string;

  // Loading
  analyzingSymptoms: string;
  processingInput: string;

  // Footer
  footerApp: string;
  developedWith: string;
  developerName: string;
  developerTitle: string;

  // Chatbot
  healthAssistant: string;
  chatSubtitle: string;
  chatPlaceholder: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    appName: "Smart Health AI",
    subtitle: "Symptom Checker",
    securePrivate: "Secure & Private",
    aiPowered: "Chandrashekhar-Powered",
    heroTag: "Health Analysis",
    heroTitle1: "Your",
    heroTitle2: "Intelligent",
    heroTitle3: "Symptom Checker",
    heroDescription: "Enter your symptoms and let our AI analyze potential conditions with confidence scores and recommended precautions.",
    enterSymptoms: "Enter your symptoms",
    symptomPlaceholder: "Type symptoms separated by commas (e.g., fever, headache)",
    symptomHint: "Select from the dropdown or type and press Enter. You can enter multiple symptoms separated by commas.",
    analyzing: "Analyzing...",
    predictButton: "🔍 Predict Possible Conditions",
    predictionResults: "Prediction Results",
    confidence: "confidence",
    recommendedPrecautions: "Recommended Precautions",
    noMatchFound: "No strong matches found. Try adding more symptoms for a better analysis.",
    disclaimer: "Disclaimer",
    disclaimerText: "This tool is for educational purposes only. It does not replace professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.",
    educationalOnly: "This tool is for educational purposes only. Always seek professional medical advice.",
    bmiCalculator: "BMI Calculator",
    height: "Height (cm)",
    weight: "Weight (kg)",
    calculateBMI: "Calculate BMI",
    bmiNote: "BMI is a screening tool, not a diagnostic measure.",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
    howItWorks: "How It Works",
    step1: "Enter your symptoms",
    step2: "AI analyzes patterns",
    step3: "Get predictions & precautions",
    privacyFirst: "Privacy First",
    privacyText: "All analysis happens locally in your browser. No health data is stored or transmitted.",
    analyzingSymptoms: "Analyzing symptoms...",
    processingInput: "Our AI is processing your input",
    footerApp: "Smart Health AI – Symptom Checker",
    developedWith: "Developed with",
    developerName: "Chandra Shekhar",
    developerTitle: "– AI/ML Engineer",
    healthAssistant: "Health Assistant",
    chatSubtitle: "symptom analysis",
    chatPlaceholder: "Describe your symptoms...",
  },
  es: {
    appName: "Smart Health AI",
    subtitle: "Verificador de Síntomas",
    securePrivate: "Seguro y Privado",
    aiPowered: "Con IA",
    heroTag: "Análisis de Salud con IA",
    heroTitle1: "Tu",
    heroTitle2: "Inteligente",
    heroTitle3: "Verificador de Síntomas",
    heroDescription: "Ingresa tus síntomas y deja que nuestra IA analice posibles condiciones con puntuaciones de confianza y precauciones recomendadas.",
    enterSymptoms: "Ingresa tus síntomas",
    symptomPlaceholder: "Escribe síntomas separados por comas (ej., fiebre, dolor de cabeza)",
    symptomHint: "Selecciona del menú o escribe y presiona Enter. Puedes ingresar múltiples síntomas separados por comas.",
    analyzing: "Analizando...",
    predictButton: "🔍 Predecir Posibles Condiciones",
    predictionResults: "Resultados de Predicción",
    confidence: "confianza",
    recommendedPrecautions: "Precauciones Recomendadas",
    noMatchFound: "No se encontraron coincidencias fuertes. Intenta agregar más síntomas para un mejor análisis.",
    disclaimer: "Aviso Legal",
    disclaimerText: "Esta herramienta es solo para fines educativos. No reemplaza el consejo médico profesional. Siempre consulte a un proveedor de atención médica calificado.",
    educationalOnly: "Esta herramienta es solo para fines educativos. Siempre busque consejo médico profesional.",
    bmiCalculator: "Calculadora de IMC",
    height: "Altura (cm)",
    weight: "Peso (kg)",
    calculateBMI: "Calcular IMC",
    bmiNote: "El IMC es una herramienta de detección, no una medida diagnóstica.",
    underweight: "Bajo peso",
    normal: "Normal",
    overweight: "Sobrepeso",
    obese: "Obeso",
    howItWorks: "Cómo Funciona",
    step1: "Ingresa tus síntomas",
    step2: "La IA analiza patrones",
    step3: "Obtén predicciones y precauciones",
    privacyFirst: "Privacidad Primero",
    privacyText: "Todo el análisis ocurre localmente en tu navegador. No se almacenan ni transmiten datos de salud.",
    analyzingSymptoms: "Analizando síntomas...",
    processingInput: "Nuestra IA está procesando tu entrada",
    footerApp: "Smart Health AI – Verificador de Síntomas",
    developedWith: "Desarrollado con",
    developerName: "Chandra Shekhar",
    developerTitle: "– Ingeniero de IA/ML",
    healthAssistant: "Asistente de Salud",
    chatSubtitle: "Análisis de síntomas con IA",
    chatPlaceholder: "Describe tus síntomas...",
  },
  hi: {
    appName: "Smart Health AI",
    subtitle: "लक्षण जांचकर्ता",
    securePrivate: "सुरक्षित और निजी",
    aiPowered: "Chandrashekhar-संचालित",
    heroTag: "स्वास्थ्य विश्लेषण",
    heroTitle1: "आपका",
    heroTitle2: "बुद्धिमान",
    heroTitle3: "लक्षण जांचकर्ता",
    heroDescription: "अपने लक्षण दर्ज करें और हमारी AI को संभावित स्थितियों का विश्लेषण करने दें, विश्वास स्कोर और अनुशंसित सावधानियों के साथ।",
    enterSymptoms: "अपने लक्षण दर्ज करें",
    symptomPlaceholder: "लक्षण अल्पविराम से अलग करके लिखें (जैसे, बुखार, सिरदर्द)",
    symptomHint: "ड्रॉपडाउन से चुनें या टाइप करके Enter दबाएं। आप अल्पविराम से अलग करके कई लक्षण दर्ज कर सकते हैं।",
    analyzing: "विश्लेषण हो रहा है...",
    predictButton: "🔍 संभावित स्थितियों की भविष्यवाणी करें",
    predictionResults: "भविष्यवाणी परिणाम",
    confidence: "विश्वास",
    recommendedPrecautions: "अनुशंसित सावधानियाँ",
    noMatchFound: "कोई मजबूत मिलान नहीं मिला। बेहतर विश्लेषण के लिए और लक्षण जोड़ने का प्रयास करें।",
    disclaimer: "अस्वीकरण",
    disclaimerText: "यह उपकरण केवल शैक्षिक उद्देश्यों के लिए है। यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। निदान और उपचार के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाता से परामर्श करें।",
    educationalOnly: "यह उपकरण केवल शैक्षिक उद्देश्यों के लिए है। हमेशा पेशेवर चिकित्सा सलाह लें।",
    bmiCalculator: "BMI कैलकुलेटर",
    height: "ऊंचाई (सेमी)",
    weight: "वजन (किग्रा)",
    calculateBMI: "BMI की गणना करें",
    bmiNote: "BMI एक स्क्रीनिंग उपकरण है, नैदानिक माप नहीं।",
    underweight: "कम वजन",
    normal: "सामान्य",
    overweight: "अधिक वजन",
    obese: "मोटापा",
    howItWorks: "यह कैसे काम करता है",
    step1: "अपने लक्षण दर्ज करें",
    step2: "AI पैटर्न का विश्लेषण करता है",
    step3: "भविष्यवाणी और सावधानियाँ प्राप्त करें",
    privacyFirst: "गोपनीयता पहले",
    privacyText: "सभी विश्लेषण आपके ब्राउज़र में स्थानीय रूप से होता है। कोई स्वास्थ्य डेटा संग्रहीत या प्रसारित नहीं किया जाता।",
    analyzingSymptoms: "लक्षणों का विश्लेषण हो रहा है...",
    processingInput: "हमारी AI आपके इनपुट को प्रोसेस कर रही है",
    footerApp: "Smart Health AI – लक्षण जांचकर्ता",
    developedWith: "द्वारा विकसित",
    developerName: "Chandra Shekhar",
    developerTitle: "– AI/ML इंजीनियर",
    healthAssistant: "स्वास्थ्य सहायक",
    chatSubtitle: "AI-संचालित लक्षण विश्लेषण",
    chatPlaceholder: "अपने लक्षण बताएं...",
  },
  fr: {
    appName: "Smart Health AI",
    subtitle: "Vérificateur de Symptômes",
    securePrivate: "Sécurisé et Privé",
    aiPowered: "Propulsé par IA",
    heroTag: "Analyse de Santé par IA",
    heroTitle1: "Votre",
    heroTitle2: "Intelligent",
    heroTitle3: "Vérificateur de Symptômes",
    heroDescription: "Entrez vos symptômes et laissez notre IA analyser les conditions potentielles avec des scores de confiance et des précautions recommandées.",
    enterSymptoms: "Entrez vos symptômes",
    symptomPlaceholder: "Tapez les symptômes séparés par des virgules (ex., fièvre, mal de tête)",
    symptomHint: "Sélectionnez dans le menu ou tapez et appuyez sur Entrée. Vous pouvez entrer plusieurs symptômes séparés par des virgules.",
    analyzing: "Analyse en cours...",
    predictButton: "🔍 Prédire les Conditions Possibles",
    predictionResults: "Résultats de Prédiction",
    confidence: "confiance",
    recommendedPrecautions: "Précautions Recommandées",
    noMatchFound: "Aucune correspondance trouvée. Essayez d'ajouter plus de symptômes pour une meilleure analyse.",
    disclaimer: "Avertissement",
    disclaimerText: "Cet outil est uniquement à des fins éducatives. Il ne remplace pas les conseils médicaux professionnels. Consultez toujours un professionnel de santé qualifié.",
    educationalOnly: "Cet outil est uniquement à des fins éducatives. Consultez toujours un professionnel de santé.",
    bmiCalculator: "Calculateur d'IMC",
    height: "Taille (cm)",
    weight: "Poids (kg)",
    calculateBMI: "Calculer l'IMC",
    bmiNote: "L'IMC est un outil de dépistage, pas une mesure diagnostique.",
    underweight: "Insuffisance pondérale",
    normal: "Normal",
    overweight: "Surpoids",
    obese: "Obèse",
    howItWorks: "Comment ça Marche",
    step1: "Entrez vos symptômes",
    step2: "L'IA analyse les modèles",
    step3: "Obtenez prédictions et précautions",
    privacyFirst: "Confidentialité d'Abord",
    privacyText: "Toute l'analyse se fait localement dans votre navigateur. Aucune donnée de santé n'est stockée ou transmise.",
    analyzingSymptoms: "Analyse des symptômes...",
    processingInput: "Notre IA traite votre saisie",
    footerApp: "Smart Health AI – Vérificateur de Symptômes",
    developedWith: "Développé avec",
    developerName: "Chandra Shekhar",
    developerTitle: "– Ingénieur IA/ML",
    healthAssistant: "Assistant Santé",
    chatSubtitle: "Analyse de symptômes par IA",
    chatPlaceholder: "Décrivez vos symptômes...",
  },
};

export const useTranslations = (language: Language) => translations[language];
export default translations;
