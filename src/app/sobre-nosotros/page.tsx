import Link from "next/link";
import { Hammer, Scale, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Manifiesto Principal */}
      <div className="space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFEA] border border-[#E6DFD5] text-xs font-semibold text-[#A67C52]">
          <Scale className="w-3.5 h-3.5 text-[#C25E38]" />
          <span>Manifiesto Ético</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#262422] leading-tight">
          La música no empieza en el dinero, sino en el oído y las manos.
        </h1>
        <p className="text-base sm:text-lg text-[#6E675F] leading-relaxed">
          Sinfonía nació para resolver la paradoja más dolorosa del mercado de instrumentos: 
          compradores novatos o estudiantes que pagan de más por piezas deficientes, y artesanos de la
          luthería cuyos trabajos quedan invisibilizados frente a instrumentos industriales de plástico.
        </p>
      </div>

      {/* Los Tres Pilares de Sinfonía */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#C25E38]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#262422]">
            Presupuesto Real
          </h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Sin algoritmos especulativos. El usuario define cuánto dinero tiene disponible y nosotros
            filtramos rigurosamente para mostrarle solo lo que está a su alcance, optimizando cada centavo.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#A67C52]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#262422]">
            Honestidad Radical
          </h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Obligamos a declarar cada rayón, trasteo o necesidad de cambio de cuerdas. Preferimos una
            publicación sincera con advertencia clara antes que una venta basada en ocultamientos.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-md bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#C25E38]">
            <Hammer className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#262422]">
            Respeto al Luthier
          </h3>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Un espacio directo y digno para constructores artesanales. Damos visibilidad a instrumentos
            de autor con planos de tiro, maderas estacionadas y certificación directa de taller.
          </p>
        </div>
      </div>

      {/* Compromiso Anti-AI Aesthetic */}
      <div className="bg-[#F3EFEA] border border-[#E6DFD5] rounded-xl p-8 space-y-4">
        <h2 className="font-editorial text-2xl font-medium text-[#262422]">
          Nuestra Identidad Visual: Taller, Madera y Papel
        </h2>
        <p className="text-sm text-[#6E675F] leading-relaxed">
          En Sinfonía rechazamos conscientemente la estética de plástico de los productos genéricos de inteligencia artificial:
          sin degradados de neón, sin sombras hiperbólicas ni interfaces que fatigan la vista. Nuestra paleta de colores
          refleja la serenidad de una mesa de carpintero, la textura del papel de partitura y la nobleza de las maderas sonoras.
        </p>
        <div className="pt-2">
          <Link
            href="/instrumentos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#262422] text-[#FAF8F5] text-xs font-semibold hover:bg-[#3B3835] transition-colors"
          >
            <span>Explorar instrumentos honestos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
