import { useState } from "react";
import { X, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "driver" | "customer";
  text: string;
  timestamp: string;
}

export default function ChatModal({
  open,
  onClose,
  customerName,
  orderId,
}: {
  open: boolean;
  onClose: () => void;
  customerName: string;
  orderId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "customer",
      text: "¿Cuánto falta para que llegues?",
      timestamp: "14:32",
    },
    {
      id: "2",
      sender: "driver",
      text: "Estoy a 5 minutos, casi llego",
      timestamp: "14:33",
    },
    {
      id: "3",
      sender: "customer",
      text: "Perfecto, deja el pedido en la puerta",
      timestamp: "14:33",
    },
    {
      id: "4",
      sender: "driver",
      text: "Listo, llegando en 3 minutos",
      timestamp: "14:34",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        sender: "driver",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-black/40">
      <div className="w-full md:max-w-md h-screen md:h-auto md:max-h-96 md:rounded-2xl bg-white overflow-hidden animate-slide-in-up md:animate-scale-in flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {customerName}
            </h2>
            <p className="text-xs text-muted-foreground">{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-150 active:scale-95"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "driver" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.sender === "driver"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-gray-100 text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${msg.sender === "driver" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 h-10 rounded-full px-4 bg-gray-100 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-md active:scale-95 transition-all duration-150"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
