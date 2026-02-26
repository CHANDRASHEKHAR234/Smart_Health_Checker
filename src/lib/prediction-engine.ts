// Symptom-disease prediction engine (simulates ML model)

export interface PredictionResult {
  disease: string;
  confidence: number;
  precautions: string[];
  description: string;
}

const SYMPTOM_LIST = [
  "fever", "headache", "cough", "fatigue", "sore throat",
  "runny nose", "body ache", "nausea", "vomiting", "diarrhea",
  "shortness of breath", "chest pain", "dizziness", "chills",
  "loss of appetite", "weight loss", "rash", "joint pain",
  "muscle pain", "abdominal pain", "back pain", "sneezing",
  "congestion", "sweating", "blurred vision", "frequent urination",
  "dry mouth", "swollen lymph nodes", "stiff neck", "cold sweat",
] as const;

export const ALL_SYMPTOMS = [...SYMPTOM_LIST].sort();

interface DiseaseProfile {
  disease: string;
  symptoms: string[];
  description: string;
  precautions: string[];
}

const DISEASE_DB: DiseaseProfile[] = [
  {
    disease: "Common Cold",
    symptoms: ["fever", "cough", "sore throat", "runny nose", "sneezing", "congestion", "headache", "fatigue"],
    description: "A viral infection of the upper respiratory tract that is usually harmless.",
    precautions: ["Rest and stay hydrated", "Use over-the-counter cold medications", "Wash hands frequently", "Avoid close contact with others"],
  },
  {
    disease: "Influenza (Flu)",
    symptoms: ["fever", "headache", "body ache", "fatigue", "cough", "sore throat", "chills", "sweating", "muscle pain"],
    description: "A contagious respiratory illness caused by influenza viruses.",
    precautions: ["Get plenty of rest", "Drink fluids to prevent dehydration", "Consider antiviral medications", "Stay home to prevent spreading"],
  },
  {
    disease: "COVID-19",
    symptoms: ["fever", "cough", "shortness of breath", "fatigue", "body ache", "loss of appetite", "headache", "sore throat", "congestion"],
    description: "A respiratory illness caused by the SARS-CoV-2 virus.",
    precautions: ["Isolate from others", "Monitor oxygen levels", "Stay hydrated and rest", "Seek medical attention if symptoms worsen"],
  },
  {
    disease: "Gastroenteritis",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever", "loss of appetite", "fatigue", "chills"],
    description: "Inflammation of the stomach and intestines, typically from viral or bacterial infection.",
    precautions: ["Stay hydrated with oral rehydration solutions", "Eat bland foods (BRAT diet)", "Avoid dairy and fatty foods", "Rest and monitor symptoms"],
  },
  {
    disease: "Migraine",
    symptoms: ["headache", "nausea", "blurred vision", "dizziness", "fatigue", "loss of appetite", "stiff neck"],
    description: "A neurological condition causing intense, debilitating headaches.",
    precautions: ["Rest in a dark, quiet room", "Apply cold compresses", "Take prescribed pain relievers", "Identify and avoid triggers"],
  },
  {
    disease: "Dengue Fever",
    symptoms: ["fever", "headache", "body ache", "joint pain", "rash", "nausea", "fatigue", "muscle pain", "loss of appetite"],
    description: "A mosquito-borne tropical disease caused by the dengue virus.",
    precautions: ["Stay hydrated", "Take acetaminophen for pain (avoid aspirin)", "Rest and monitor platelet count", "Use mosquito repellent and nets"],
  },
  {
    disease: "Pneumonia",
    symptoms: ["fever", "cough", "shortness of breath", "chest pain", "fatigue", "chills", "sweating", "nausea", "loss of appetite"],
    description: "An infection that inflames the air sacs in one or both lungs.",
    precautions: ["Seek medical attention promptly", "Complete prescribed antibiotics", "Get adequate rest", "Practice deep breathing exercises"],
  },
  {
    disease: "Diabetes (Type 2)",
    symptoms: ["frequent urination", "fatigue", "blurred vision", "weight loss", "dry mouth", "loss of appetite", "nausea"],
    description: "A chronic condition that affects the way the body processes blood sugar.",
    precautions: ["Monitor blood sugar levels regularly", "Maintain a balanced diet", "Exercise regularly", "Take medications as prescribed"],
  },
  {
    disease: "Meningitis",
    symptoms: ["headache", "fever", "stiff neck", "nausea", "vomiting", "rash", "chills", "dizziness", "fatigue"],
    description: "Inflammation of the membranes surrounding the brain and spinal cord.",
    precautions: ["Seek emergency medical care immediately", "Complete the full course of antibiotics", "Rest in a dim environment", "Stay hydrated"],
  },
  {
    disease: "Heart-related Issues",
    symptoms: ["chest pain", "shortness of breath", "cold sweat", "dizziness", "nausea", "fatigue", "back pain"],
    description: "Symptoms that may indicate cardiac conditions requiring medical evaluation.",
    precautions: ["Call emergency services immediately", "Chew aspirin if not allergic", "Rest in a comfortable position", "Do not ignore recurring symptoms"],
  },
];

export function predictDisease(inputSymptoms: string[]): PredictionResult[] {
  const normalized = inputSymptoms.map(s => s.trim().toLowerCase());

  const results: PredictionResult[] = DISEASE_DB.map(profile => {
    const matchCount = normalized.filter(s => profile.symptoms.includes(s)).length;
    const coverage = matchCount / profile.symptoms.length;
    const inputCoverage = matchCount / Math.max(normalized.length, 1);
    // Weighted score combining both coverage metrics
    const confidence = Math.round((coverage * 0.6 + inputCoverage * 0.4) * 100);

    return {
      disease: profile.disease,
      confidence: Math.min(confidence, 95), // Cap at 95%
      precautions: profile.precautions,
      description: profile.description,
    };
  })
    .filter(r => r.confidence > 10)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  return results;
}
