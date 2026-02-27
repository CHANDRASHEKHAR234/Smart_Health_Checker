import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Stethoscope, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ALL_SYMPTOMS, predictDisease, PredictionResult } from "@/lib/prediction-engine";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslations } from "@/lib/translations";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const GREETING = `👋 Hello! I'm your **Smart Health AI Assistant**. I can help you understand your symptoms and suggest possible conditions.

Here's how I can help:
- Tell me your symptoms (e.g. *"I have a fever and headache"*)
- Ask about a specific condition
- Type **"clear"** to start over

⚠️ *This is for educational purposes only. Always consult a doctor for medical advice.*`;

function extractSymptoms(text: string): string[] {
  const lower = text.toLowerCase();
  return ALL_SYMPTOMS.filter((s) => lower.includes(s));
}

function generateResponse(userMessage: string, history: ChatMessage[]): string {
  const lower = userMessage.toLowerCase().trim();

  if (lower === "clear" || lower === "reset" || lower === "start over") {
    return "🔄 Conversation cleared! Tell me your symptoms whenever you're ready.";
  }

  if (lower.includes("hello") || lower.includes("hi") || lower === "hey") {
    return "Hello! 😊 How are you feeling today? Describe your symptoms and I'll try to help.";
  }

  if (lower.includes("thank")) {
    return "You're welcome! Remember, always consult a healthcare professional for proper diagnosis. Take care! 💚";
  }

  // Extract symptoms from the message and conversation history
  const currentSymptoms = extractSymptoms(userMessage);
  const historySymptoms = history
    .filter((m) => m.role === "user")
    .flatMap((m) => extractSymptoms(m.content));

  const allSymptoms = [...new Set([...historySymptoms, ...currentSymptoms])];

  if (allSymptoms.length === 0) {
    return `I couldn't identify specific symptoms from your message. Could you describe them more clearly?\n\n**Some symptoms I recognize:**\n${ALL_SYMPTOMS.slice(0, 12)
      .map((s) => `- ${s}`)
      .join("\n")}\n\n...and more. Try describing how you feel!`;
  }

  const predictions = predictDisease(allSymptoms);

  if (predictions.length === 0) {
    return `I noted these symptoms: **${allSymptoms.join(", ")}**, but I couldn't find a strong match in my database.\n\nCould you provide more details or additional symptoms?`;
  }

  let response = `Based on your symptoms (**${allSymptoms.join(", ")}**), here's my analysis:\n\n`;

  predictions.forEach((p: PredictionResult, i: number) => {
    const emoji = i === 0 ? "🔴" : i === 1 ? "🟠" : "🟡";
    response += `### ${emoji} ${p.disease} — ${p.confidence}% match\n`;
    response += `${p.description}\n\n`;
    response += `**Recommended precautions:**\n`;
    p.precautions.forEach((pr) => {
      response += `- ${pr}\n`;
    });
    response += "\n";
  });

  response +=
    "---\n⚠️ *These are AI-generated suggestions, not medical diagnoses. Please consult a healthcare professional.*";

  return response;
}

const MedicalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: GREETING, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const t = useTranslations(language);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = text.toLowerCase() === "clear"
      ? generateResponse(text, [])
      : generateResponse(text, updated);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) =>
      text.toLowerCase() === "clear"
        ? [{ id: "greeting", role: "assistant", content: GREETING, timestamp: new Date() }, botMsg]
        : [...prev, botMsg]
    );
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Open medical chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Stethoscope className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl glass-strong shadow-2xl animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="gradient-hero px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-display font-semibold text-primary-foreground">
                {t.healthAssistant}
              </h3>
              <p className="text-xs text-primary-foreground/70">{t.chatSubtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-accent text-accent-foreground"
                      : "gradient-hero text-primary-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "gradient-hero text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0 [&_hr]:my-2">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatPlaceholder}
                className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl gradient-hero text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalChatbot;
