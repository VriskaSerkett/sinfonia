import Link from "next/link";
import Image from "next/image";
import { Instrument } from "@/types";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Hammer, AlertCircle, CheckCircle, ShieldCheck, MapPin } from "lucide-react";

interface InstrumentCardProps {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: InstrumentCardProps) {
  const conditionMeta = CONDITION_LABELS[instrument.condition];
  const coverImage = instrument.images.find((img) => img.isCover)?.url || instrument.images[0]?.url;

  return (
    <article className="group bg-[#FFFFFF] border border-[#E6DFD5] hover:border-[#D4C9BC] rounded-xl overflow-hidden transition-all shadow-[0_2px_12px_-2px_rgba(38,36,34,0.04)] hover:shadow-[0_6px_20px_-2px_rgba(38,36,34,0.08)] flex flex-col">
      {/* Portada con Badge de Origen */}
      <div className="relative aspect-[4/3] bg-[#F3EFEA] overflow-hidden">
        {coverImage && (
          <img
            src={coverImage}
            alt={instrument.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Badge de Condición */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md border shadow-sm ${conditionMeta.badgeClass}`}
          >
            {instrument.sellerType === "LUTHIER_AUTHOR" ? (
              <Hammer className="w-3 h-3" />
            ) : (
              <ShieldCheck className="w-3 h-3" />
            )}
            {conditionMeta.label}
          </span>
        </div>

        {/* Ubicación */}
        <div className="absolute bottom-3 left-3 bg-[#262422]/80 backdrop-blur-sm text-[#FAF8F5] text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#A67C52]" />
          <span>{instrument.location}</span>
        </div>
      </div>

      {/* Contenido / Ficha Pericial */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E675F]">
            <span>{instrument.subCategory}</span>
            <span className="font-mono text-[11px] text-[#A67C52]">
              {instrument.sellerType === "LUTHIER_AUTHOR" ? "Taller de Autor" : "Particular"}
            </span>
          </div>

          <h3 className="font-editorial text-lg font-semibold text-[#262422] group-hover:text-[#C25E38] transition-colors line-clamp-2">
            <Link href={`/instrumentos/${instrument.slug}`}>
              {instrument.title}
            </Link>
          </h3>

          <p className="text-xs text-[#6E675F] line-clamp-2 leading-relaxed">
            {instrument.description}
          </p>
        </div>

        {/* Bloque de Honestidad Técnica Radical */}
        <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#6E675F]">Cuerdas / Ajuste:</span>
            <span className="font-medium text-[#262422] flex items-center gap-1">
              {instrument.stringsCondition === "NEW" && (
                <>
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Calibrado / Cuerdas Nuevas
                </>
              )}
              {instrument.stringsCondition === "USED" && "Cuerdas con uso normal"}
              {instrument.stringsCondition === "NEEDS_REPLACEMENT" && (
                <>
                  <AlertCircle className="w-3 h-3 text-[#D97706]" />
                  A cambiar por comprador
                </>
              )}
            </span>
          </div>

          {instrument.flawsDescription && (
            <div className="pt-2 border-t border-[#E6DFD5]/80 text-[11px]">
              <span className="font-semibold text-[#6E675F] block mb-0.5">
                Detalle a considerar:
              </span>
              <p className="text-[#262422] italic line-clamp-1">
                &ldquo;{instrument.flawsDescription}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Precio y CTA */}
        <div className="pt-3 border-t border-[#E6DFD5] flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#6E675F] block">
              Precio Transparente
            </span>
            <span className="font-editorial text-xl font-bold text-[#262422]">
              {formatCurrency(instrument.price, instrument.currency)}
            </span>
          </div>

          <Link
            href={`/instrumentos/${instrument.slug}`}
            className="text-xs font-semibold text-[#C25E38] hover:text-[#AA4F2D] inline-flex items-center gap-1 underline underline-offset-4 decoration-[#E6DFD5] hover:decoration-[#C25E38]"
          >
            Ver reporte pericial →
          </Link>
        </div>
      </div>
    </article>
  );
}
