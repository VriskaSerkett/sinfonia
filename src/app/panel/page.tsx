"use client";

import Link from "next/link";
import {
  Hammer,
  ShieldCheck,
  Package,
  MessageSquare,
  Eye,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PanelPage() {
  const sellerInstruments = MOCK_INSTRUMENTS.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5CAB8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
            <Hammer className="w-4 h-4 stroke-[1.75]" />
            <span>Espacio de Vendedor & Luthería</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16231C] mt-1">
            Panel de Publicaciones & Taller
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5B51]">
            Administrá tus instrumentos publicados, consultas sobre calibración y estado de verificación técnica.
          </p>
        </div>

        <Link
          href="/publicar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#23583C] hover:bg-[#173F2B] text-[#FAF7F0] text-xs sm:text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 stroke-[1.75]" />
          <span>Publicar nuevo instrumento</span>
        </Link>
      </div>

      {/* Tarjetas de Métricas & Estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4B5B51]">
            <span>Publicaciones Activas</span>
            <Package className="w-4 h-4 text-[#3B674E] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#16231C]">
            {sellerInstruments.length}
          </div>
          <span className="text-[11px] text-[#23583C] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
            Reportes periciales aprobados
          </span>
        </div>

        <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4B5B51]">
            <span>Consultas por Presupuesto</span>
            <MessageSquare className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#16231C]">14</div>
          <span className="text-[11px] text-[#4B5B51]">3 conversaciones activas</span>
        </div>

        <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4B5B51]">
            <span>Vistas en Catálogo</span>
            <Eye className="w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#16231C]">482</div>
          <span className="text-[11px] text-[#3B674E] font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 stroke-[1.75]" />
            Indexado en búsquedas relevantes
          </span>
        </div>

        <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4B5B51]">
            <span>Nivel de Honestidad Técnica</span>
            <ShieldCheck className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#16231C]">100%</div>
          <span className="text-[11px] text-[#23583C]">0 reportes de discordancia</span>
        </div>
      </div>

      {/* Lista de Instrumentos Publicados */}
      <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#D5CAB8] flex items-center justify-between">
          <h2 className="font-editorial text-xl font-medium text-[#16231C]">
            Tus Instrumentos en Exhibición
          </h2>
          <span className="text-xs text-[#4B5B51]">
            Los compradores ven exactamente lo que declaraste en la ficha.
          </span>
        </div>

        <div className="divide-y divide-[#D5CAB8]">
          {sellerInstruments.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#EDE6D6]/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#E5DDCB] border border-[#D5CAB8] overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]?.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#16231C]">{item.title}</span>
                    <span className="text-[10px] font-semibold bg-[#EDE6D6] border border-[#D5CAB8] text-[#3B674E] px-2 py-0.5 rounded">
                      {item.subCategory}
                    </span>
                  </div>
                  <p className="text-xs text-[#4B5B51] line-clamp-1">
                    Desperfectos declarados: {item.flawsDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 self-stretch sm:self-auto">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#4B5B51] block">
                    Precio publicado
                  </span>
                  <span className="font-editorial text-lg font-bold text-[#16231C]">
                    {formatCurrency(item.price, item.currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/instrumentos/${item.slug}`}
                    className="px-3 py-1.5 text-xs font-medium border border-[#D5CAB8] hover:border-[#23583C] text-[#16231C] rounded-md transition-colors"
                  >
                    Ver ficha
                  </Link>
                  <Link
                    href={`/mensajes?instrumentId=${item.id}`}
                    className="px-3 py-1.5 text-xs font-medium bg-[#23583C] text-[#FAF7F0] rounded-md hover:bg-[#173F2B] transition-colors"
                  >
                    Chat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificación de Taller & Mayoría de Edad */}
      <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3B674E] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
            <span>Acreditación de Taller Artesanal</span>
          </div>
          <h3 className="font-editorial text-2xl font-medium text-[#16231C]">
            ¿Fabricás instrumentos de autor?
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5B51] leading-relaxed">
            Los luthiers verificados obtienen la insignia oficial de Taller de Autor, habilitación para adjuntar especificaciones de maderas estacionadas y visibilidad destacada sin cargos extras.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Tu solicitud de acreditación de taller ha sido iniciada.")}
          className="px-5 py-2.5 bg-[#23583C] text-[#FAF7F0] text-xs font-semibold rounded-lg hover:bg-[#173F2B] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
        >
          Solicitar Verificación de Luthier
        </button>
      </div>
    </div>
  );
}
