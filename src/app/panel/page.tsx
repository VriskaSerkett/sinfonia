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
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PanelPage() {
  const sellerInstruments = MOCK_INSTRUMENTS.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD5] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
            <Hammer className="w-4 h-4 stroke-[1.75]" />
            <span>Espacio de Vendedor & Luthería</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#262422] mt-1">
            Panel de Publicaciones & Taller
          </h1>
          <p className="text-xs sm:text-sm text-[#6E675F]">
            Administrá tus instrumentos publicados, consultas sobre calibración y estado de verificación técnica.
          </p>
        </div>

        <Link
          href="/publicar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] text-xs sm:text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 stroke-[1.75]" />
          <span>Publicar nuevo instrumento</span>
        </Link>
      </div>

      {/* Tarjetas de Métricas & Estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E675F]">
            <span>Publicaciones Activas</span>
            <Package className="w-4 h-4 text-[#A67C52] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#262422]">
            {sellerInstruments.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
            Reportes periciales aprobados
          </span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E675F]">
            <span>Consultas por Presupuesto</span>
            <MessageSquare className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#262422]">14</div>
          <span className="text-[11px] text-[#6E675F]">3 conversaciones activas</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E675F]">
            <span>Vistas en Catálogo</span>
            <Eye className="w-4 h-4 text-[#6E675F] stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#262422]">482</div>
          <span className="text-[11px] text-[#A67C52] font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 stroke-[1.75]" />
            Indexado en búsquedas relevantes
          </span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E675F]">
            <span>Nivel de Honestidad Técnica</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[1.75]" />
          </div>
          <div className="font-editorial text-3xl font-semibold text-[#262422]">100%</div>
          <span className="text-[11px] text-emerald-700">0 reportes de discordancia</span>
        </div>
      </div>

      {/* Lista de Instrumentos Publicados */}
      <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E6DFD5] flex items-center justify-between">
          <h2 className="font-editorial text-xl font-medium text-[#262422]">
            Tus Instrumentos en Exhibición
          </h2>
          <span className="text-xs text-[#6E675F]">
            Los compradores ven exactamente lo que declaraste en la ficha.
          </span>
        </div>

        <div className="divide-y divide-[#E6DFD5]">
          {sellerInstruments.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#F3EFEA] border border-[#E6DFD5] overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]?.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#262422]">{item.title}</span>
                    <span className="text-[10px] font-semibold bg-[#FAF8F5] border border-[#E6DFD5] text-[#A67C52] px-2 py-0.5 rounded">
                      {item.subCategory}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E675F] line-clamp-1">
                    Desperfectos declarados: {item.flawsDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 self-stretch sm:self-auto">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#6E675F] block">
                    Precio publicado
                  </span>
                  <span className="font-editorial text-lg font-bold text-[#262422]">
                    {formatCurrency(item.price, item.currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/instrumentos/${item.slug}`}
                    className="px-3 py-1.5 text-xs font-medium border border-[#E6DFD5] hover:border-[#262422] rounded-md transition-colors"
                  >
                    Ver ficha
                  </Link>
                  <Link
                    href={`/mensajes?instrumentId=${item.id}`}
                    className="px-3 py-1.5 text-xs font-medium bg-[#262422] text-[#FAF8F5] rounded-md hover:bg-[#3B3835] transition-colors"
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
      <div className="bg-[#F3EFEA] border border-[#E6DFD5] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
            <span>Acreditación de Taller Artesanal</span>
          </div>
          <h3 className="font-editorial text-2xl font-medium text-[#262422]">
            ¿Fabricás instrumentos de autor?
          </h3>
          <p className="text-xs sm:text-sm text-[#6E675F] leading-relaxed">
            Los luthiers verificados obtienen la insignia oficial de Taller de Autor, habilitación para adjuntar especificaciones de maderas estacionadas y visibilidad destacada sin cargos extras.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Tu solicitud de acreditación de taller ha sido iniciada.")}
          className="px-5 py-2.5 bg-[#262422] text-[#FAF8F5] text-xs font-semibold rounded-lg hover:bg-[#3B3835] transition-colors whitespace-nowrap cursor-pointer"
        >
          Solicitar Verificación de Luthier
        </button>
      </div>
    </div>
  );
}
