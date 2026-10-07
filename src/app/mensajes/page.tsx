"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  User,
  Package,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Conversation {
  id: string;
  instrumentTitle: string;
  instrumentPrice: number;
  currency: "ARS" | "USD";
  location: string;
  counterpartName: string;
  counterpartRole: "PARTICULAR" | "LUTHIER_AUTHOR";
  status: "PENDING_AGREEMENT" | "RESERVED" | "COMPLETED";
  messages: { sender: "me" | "other"; text: string; time: string }[];
}

export default function MensajesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      instrumentTitle: "Guitarra Clásica de Concierto Alhambra 4P",
      instrumentPrice: 340000,
      currency: "ARS",
      location: "Villa Urquiza, CABA",
      counterpartName: "Esteban R. (Profesor)",
      counterpartRole: "PARTICULAR",
      status: "PENDING_AGREEMENT",
      messages: [
        {
          sender: "other",
          text: "¡Hola! Gracias por el interés. El instrumento está disponible y listo para probarse con atril y afinador.",
          time: "10:14",
        },
        {
          sender: "me",
          text: "Hola, leí el reporte de detalles. Me interesa mucho la calibración que mencionás. ¿Podríamos coordinar para probar la acción de las cuerdas en algún punto seguro?",
          time: "10:18",
        },
        {
          sender: "other",
          text: "Totalmente. Podemos encontrarnos en la confitería sobre Av. Triunvirato o en el hall del conservatorio. Llevo funda acolchada.",
          time: "10:22",
        },
      ],
    },
    {
      id: "conv-2",
      instrumentTitle: "Guitarra Romántica 'Orfeo' — Luthier Hernán Morales",
      instrumentPrice: 1850000,
      currency: "ARS",
      location: "San Telmo, CABA",
      counterpartName: "Hernán Morales (Taller)",
      counterpartRole: "LUTHIER_AUTHOR",
      status: "RESERVED",
      messages: [
        {
          sender: "me",
          text: "Buenas tardes maestro, vi las especificaciones de la tapa de pino abeto de 15 años. ¿La guitarra sigue en exhibición?",
          time: "Ayer",
        },
        {
          sender: "other",
          text: "Hola Martín. Sí, está en el taller. Ya reservamos un turno para que vengas a tocarla y sientas el equilibrio del diapasón de ébano.",
          time: "Ayer",
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState("conv-1");
  const [inputMessage, setInputMessage] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            messages: [
              ...c.messages,
              { sender: "me", text: inputMessage.trim(), time: "Ahora" },
            ],
          };
        }
        return c;
      })
    );
    setInputMessage("");
  };

  const handleAdvanceStatus = () => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          const nextStatus =
            c.status === "PENDING_AGREEMENT" ? "RESERVED" : "COMPLETED";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Cabecera */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
          <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
          <span>Protocolo de Compra y Reserva Protegida</span>
        </div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-medium text-[#262422]">
          Bandeja de Acuerdos & Chat Pericial
        </h1>
        <p className="text-xs sm:text-sm text-[#6E675F]">
          Conversaciones directas para acordar cita de prueba, verificar defectos declarados y confirmar la entrega.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Lista de Conversaciones */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E6DFD5] text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
              Tratativas Activas ({conversations.length})
            </div>

            <div className="divide-y divide-[#E6DFD5]">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeConv.id;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-[#FAF8F5] border-l-4 border-l-[#C25E38]"
                        : "hover:bg-[#FAF8F5]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#262422] line-clamp-1">
                        {conv.counterpartName}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          conv.status === "RESERVED"
                            ? "bg-amber-100 text-[#D97706]"
                            : conv.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-[#F3EFEA] text-[#6E675F]"
                        }`}
                      >
                        {conv.status === "RESERVED"
                          ? "Reservado"
                          : conv.status === "COMPLETED"
                          ? "Concretado"
                          : "En acuerdo"}
                      </span>
                    </div>

                    <div className="text-xs text-[#262422] font-editorial line-clamp-1">
                      {conv.instrumentTitle}
                    </div>

                    <div className="text-[11px] text-[#A67C52] font-mono">
                      {formatCurrency(conv.instrumentPrice, conv.currency)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner de Pautas de Seguridad Física */}
          <div className="bg-[#F3EFEA] border border-[#E6DFD5] rounded-xl p-4 space-y-2 text-xs text-[#6E675F]">
            <div className="flex items-center gap-1.5 text-[#262422] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
              <span>Recomendaciones Periciales de Sinfonía</span>
            </div>
            <ul className="space-y-1.5 text-[11px] list-disc list-inside">
              <li>Revisá que los rayones o marcas coincidan con la declaración técnica.</li>
              <li>Probá la afinación y resonancia en todas las octavas.</li>
              <li>Pactá puntos de encuentro con buena luz natural o acústica adecuada.</li>
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Ventana del Chat y Detalle del Acuerdo */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Ficha Superior del Acuerdo */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A67C52]">
                  {activeConv.counterpartRole === "LUTHIER_AUTHOR"
                    ? "Taller de Luthier"
                    : "Vendedor Particular"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6DFD5]" />
                <span className="text-xs text-[#6E675F] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#A67C52] stroke-[1.75]" />
                  {activeConv.location}
                </span>
              </div>
              <h3 className="font-editorial text-lg font-semibold text-[#262422]">
                {activeConv.instrumentTitle}
              </h3>
              <div className="text-xs text-[#C25E38] font-mono font-semibold">
                Monto pactado: {formatCurrency(activeConv.instrumentPrice, activeConv.currency)}
              </div>
            </div>

            {/* Estado del Acuerdo e Interacción */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {activeConv.status === "PENDING_AGREEMENT" && (
                <button
                  type="button"
                  onClick={handleAdvanceStatus}
                  className="px-4 py-2 bg-[#A67C52] hover:bg-[#8E653E] text-[#FAF8F5] rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Marcar como Reservado
                </button>
              )}
              {activeConv.status === "RESERVED" && (
                <button
                  type="button"
                  onClick={handleAdvanceStatus}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-[#FAF8F5] rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Confirmar Entrega Concretada
                </button>
              )}
              {activeConv.status === "COMPLETED" && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 stroke-[1.75]" />
                  Transacción Concretada
                </span>
              )}
            </div>
          </div>

          {/* Ventana de Mensajes */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl flex flex-col h-[460px] overflow-hidden shadow-sm">
            <div className="p-3 border-b border-[#E6DFD5] bg-[#FAF8F5] flex items-center justify-between text-xs text-[#6E675F]">
              <span className="font-medium text-[#262422]">
                Canal con {activeConv.counterpartName}
              </span>
              <span>Mensajería encriptada punto a punto</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]/30">
              {activeConv.messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === "me" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] p-3.5 rounded-xl text-xs leading-relaxed ${
                      m.sender === "me"
                        ? "bg-[#262422] text-[#FAF8F5] rounded-br-none"
                        : "bg-[#FFFFFF] border border-[#E6DFD5] text-[#262422] rounded-bl-none shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#9E968D] mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input para Enviar */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#E6DFD5] bg-[#FFFFFF] flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribí tu consulta sobre estado o acordá punto de encuentro..."
                className="flex-1 bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg px-4 py-2.5 text-xs text-[#262422] outline-none focus:border-[#C25E38]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
