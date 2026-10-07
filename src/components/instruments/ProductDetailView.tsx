"use client";

import { useState } from "react";
import Link from "next/link";
import { Instrument } from "@/types";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  Hammer,
  AlertTriangle,
  CheckCircle2,
  Package,
  MessageSquare,
  Flag,
  Share2,
  ArrowLeft,
  MapPin,
  Calendar,
  X,
  CheckCircle,
  Volume2,
  Play,
  Pause,
  Award,
  Sparkles,
} from "lucide-react";

interface ProductDetailViewProps {
  instrument: Instrument;
}

export default function ProductDetailView({ instrument }: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportComments, setReportComments] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const conditionMeta = CONDITION_LABELS[instrument.condition];
  const activeImage = instrument.images[selectedImageIndex] || instrument.images[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportModalOpen(false);
      setReportSubmitted(false);
      setReportReason("");
      setReportComments("");
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navegación y Volver */}
      <div className="flex items-center justify-between">
        <Link
          href="/instrumentos"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E675F] hover:text-[#262422] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
          <span>Volver al catálogo por presupuesto</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#6E675F] hover:text-[#262422] px-3 py-1.5 rounded border border-[#E6DFD5] bg-[#FFFFFF] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>{copiedLink ? "¡Enlace copiado!" : "Compartir ficha"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Columna Izquierda: Galería y Fotos Periciales */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/3] bg-[#F3EFEA] border border-[#E6DFD5] rounded-xl overflow-hidden relative shadow-sm">
            <img
              src={activeImage?.url}
              alt={instrument.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-4 left-4 bg-[#262422]/85 backdrop-blur-sm text-[#FAF8F5] text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
              <span>
                {activeImage?.caption || "Foto pericial verificada — Sin filtros publicitarios"}
              </span>
            </div>
          </div>

          {/* Miniaturas de selección de fotos */}
          {instrument.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {instrument.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`aspect-[4/3] bg-[#F3EFEA] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i
                      ? "border-[#C25E38] ring-1 ring-[#C25E38]"
                      : "border-[#E6DFD5] hover:border-[#D4C9BC]"
                  }`}
                >
                  <img src={img.url} alt="Miniatura" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Muestra Sonora / Acústica de Taller */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#C25E38] hover:bg-[#FBF1EC] transition-colors cursor-pointer"
                title={isPlayingAudio ? "Pausar muestra" : "Reproducir muestra acústica"}
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 stroke-[2]" />
                )}
              </button>
              <div>
                <div className="text-xs font-semibold text-[#262422] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#A67C52]" />
                  <span>Muestra Sonora de Afinación & Resonancia</span>
                </div>
                <p className="text-[11px] text-[#6E675F]">
                  {isPlayingAudio
                    ? "Reproduciendo audio acústico sin compresión..."
                    : "Grabación sin ecualización para evaluar sustain y balance tonal."}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#6E675F] hidden sm:inline">0:42 min</span>
          </div>

          {/* Bloque Exclusivo: REPORTE DE DETALLES Y DESGASTES */}
          <div className="bg-[#FAF8F5] border-2 border-[#D97706]/40 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#D97706]">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 stroke-[1.75]" />
              <h3 className="font-editorial text-lg font-bold text-[#262422]">
                Declaración Obligatoria de Defectos y Desgastes
              </h3>
            </div>

            <p className="text-xs text-[#6E675F]">
              En cumplimiento del estándar de <strong>Honestidad Técnica Radical</strong>, el vendedor
              ha declarado formalmente los siguientes puntos sobre esta unidad:
            </p>

            <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-lg p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-[#6E675F] block">
                  Defectos cosméticos o reparaciones pendientes:
                </span>
                <p className="text-sm text-[#262422] font-mono leading-relaxed bg-[#FBF1EC]/50 p-2.5 rounded border border-[#E6DFD5]">
                  {instrument.flawsDescription || "Sin defectos cosméticos ni estructurales reportados."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E6DFD5] text-xs">
                <div>
                  <span className="text-[#6E675F] block">Estado de cuerdas / afinación:</span>
                  <span className="font-semibold text-[#262422]">
                    {instrument.stringsCondition === "NEW" && "Nuevas / Calibrado reciente"}
                    {instrument.stringsCondition === "USED" && "Usadas con vida útil remanente"}
                    {instrument.stringsCondition === "NEEDS_REPLACEMENT" && "Requiere recambio inmediato"}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E675F] block">Electrónica / Pastillas:</span>
                  <span className="font-semibold text-[#262422]">
                    {instrument.electronics || "Acústico (sin componentes electrónicos)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Pericial Rápido */}
            <div className="pt-2 border-t border-[#E6DFD5] space-y-2">
              <span className="text-[11px] font-semibold text-[#6E675F] uppercase tracking-wider block">
                Puntos de Revisión Técnica Aprobados
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>Alma y mástil con curvatura adecuada</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>Tapa armónica sin fisuras de dilatación</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>Puente firme con tiro pericial verificado</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>Clavijero afinando de manera suave</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ficha Técnica Detallada */}
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
            <h3 className="font-editorial text-xl font-medium text-[#262422]">
              Ficha Técnica & Construcción
            </h3>

            {instrument.tonewoods && instrument.tonewoods.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
                  Maderas Nobles de Construcción
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {instrument.tonewoods.map((wood, idx) => (
                    <li
                      key={idx}
                      className="bg-[#FAF8F5] border border-[#E6DFD5] px-3 py-2 rounded-md font-medium text-[#262422]"
                    >
                      {wood}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52] block mb-2">
                Accesorios incluidos en la entrega
              </span>
              <ul className="space-y-1.5 text-xs">
                {instrument.includedAccessories.map((acc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#262422]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 stroke-[1.75]" />
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Compra, Vendedor y Reserva */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
            {/* Header del Producto */}
            <div className="space-y-3 pb-6 border-b border-[#E6DFD5]">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${conditionMeta.badgeClass}`}
                >
                  {instrument.sellerType === "LUTHIER_AUTHOR" ? (
                    <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[1.75]" />
                  )}
                  {conditionMeta.label}
                </span>

                <span className="text-xs text-[#6E675F]">{instrument.subCategory}</span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#262422] leading-tight">
                {instrument.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-[#6E675F]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A67C52] stroke-[1.75]" />
                  {instrument.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#6E675F] stroke-[1.75]" />
                  Publicado el {instrument.createdAt}
                </span>
              </div>
            </div>

            {/* Precio Transparente */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6E675F]">
                Precio Final Acordado
              </span>
              <div className="font-editorial text-3xl sm:text-4xl font-bold text-[#262422]">
                {formatCurrency(instrument.price, instrument.currency)}
              </div>
              <p className="text-[11px] text-[#A67C52]">
                ✓ Sin comisiones especulativas sobre tu presupuesto.
              </p>
            </div>

            {/* Perfil del Vendedor / Luthier */}
            <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E675F] block">
                Origen del Instrumento
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#262422]">
                    {instrument.sellerName}
                  </h4>
                  <p className="text-xs text-[#6E675F]">
                    {instrument.sellerType === "LUTHIER_AUTHOR"
                      ? "Taller de Luthería Verificado"
                      : "Músico particular con identidad validada"}
                  </p>
                </div>
                {instrument.sellerType === "LUTHIER_AUTHOR" ? (
                  <Link
                    href="/luthier/hernan-morales"
                    className="bg-[#F7EFE6] text-[#A67C52] border border-[#E2CFB8] text-[10px] font-semibold px-2 py-0.5 rounded hover:bg-[#EAE0D2] transition-colors"
                  >
                    Ver Taller →
                  </Link>
                ) : (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                    Mayor de 18 (+18)
                  </span>
                )}
              </div>
            </div>

            {/* Acciones: Reservar y Chat Privado */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/mensajes?instrumentId=${instrument.id}`}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-lg bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] text-sm font-semibold tracking-wide shadow-sm transition-all text-center"
              >
                <Package className="w-4 h-4 stroke-[1.75]" />
                <span>Comprar / Reservar con Chat Protegido</span>
              </Link>

              <Link
                href={`/mensajes?instrumentId=${instrument.id}&mode=consult`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#262422] border border-[#E6DFD5] text-xs font-semibold transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#A67C52] stroke-[1.75]" />
                <span>Consultar al vendedor sobre calibración</span>
              </Link>
            </div>

            {/* Botón de Reporte Comunitario con Modal */}
            <div className="pt-4 border-t border-[#E6DFD5] flex items-center justify-between text-xs text-[#6E675F]">
              <span className="text-[11px]">¿Notás algo irregular?</span>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#C25E38] transition-colors cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Reportar artículo o datos falsos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reporte Comunitario */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#262422]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C25E38]">
                <Flag className="w-5 h-5 stroke-[1.75]" />
                <h3 className="font-editorial text-lg font-semibold text-[#262422]">
                  Reportar Publicación
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="text-[#6E675F] hover:text-[#262422]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-[#FAF8F5] rounded-lg border border-[#E6DFD5]">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-editorial text-base font-semibold text-[#262422]">
                  Reporte enviado a moderación
                </h4>
                <p className="text-xs text-[#6E675F]">
                  Gracias por cuidar la honestidad de la comunidad. Nuestro equipo pericial revisará este artículo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="space-y-4">
                <p className="text-xs text-[#6E675F]">
                  Si este instrumento infringe nuestro código de honestidad, seleccioná el motivo:
                </p>

                <div className="space-y-2 text-xs">
                  {[
                    "Defectos o roturas graves no declaradas en la ficha",
                    "Instrumento falso o copia no declarada",
                    "No corresponde a un instrumento musical o spam",
                    "Precio engañoso o sospecha de fraude",
                  ].map((reason) => (
                    <label
                      key={reason}
                      className="flex items-center gap-2.5 p-2 rounded border border-[#E6DFD5] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={reportReason === reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-[#C25E38] focus:ring-[#C25E38]"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#6E675F]">
                    Detalles adicionales (opcional):
                  </label>
                  <textarea
                    rows={2}
                    value={reportComments}
                    onChange={(e) => setReportComments(e.target.value)}
                    placeholder="Contanos qué incongruencia detectaste..."
                    className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-2.5 text-xs text-[#262422] outline-none focus:border-[#C25E38]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="flex-1 py-2 text-xs font-semibold text-[#6E675F] bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!reportReason}
                    className="flex-1 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#C25E38] hover:bg-[#AA4F2D] disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Enviar Reporte
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
