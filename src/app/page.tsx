import Link from "next/link";
import BudgetSearchBar from "@/components/search/BudgetSearchBar";
import InstrumentCard from "@/components/instruments/InstrumentCard";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/constants";
import {
  ShieldCheck,
  Hammer,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  PlusCircle,
  SlidersHorizontal,
} from "lucide-react";

export default function HomePage() {
  const accessibleOpportunities = MOCK_INSTRUMENTS.filter(
    (item) => item.sellerType === "PARTICULAR"
  );
  const luthierCreations = MOCK_INSTRUMENTS.filter(
    (item) => item.sellerType === "LUTHIER_AUTHOR"
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero con Manifiesto y Selector de Modo Rápido */}
      <section className="relative pt-8 sm:pt-14 pb-8 border-b border-[#D5CAB8]/70 bg-gradient-to-b from-[#E2DAC9]/35 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] border border-[#BFD4C5] text-xs font-semibold text-[#23583C]">
                <Scale className="w-3.5 h-3.5 text-[#23583C] stroke-[1.75]" />
                <span>Plataforma Basada en Presupuesto Real</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#16231C] leading-[1.12]">
                Encontrá el instrumento exacto para tu oído y tu bolsillo.
              </h1>

              <p className="text-base sm:text-lg text-[#4B5B51] leading-relaxed max-w-2xl font-light">
                Facilitamos el acceso a la música. Sin sobreprecios opacos, sin defectos ocultos. Cada publicación detalla de forma precisa calibración, desgastes honestos y accesorios incluidos.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#4B5B51]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
                  Declaración obligatoria de defectos
                </span>
                <span className="flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-[#3B674E] stroke-[1.75]" />
                  Acceso directo a Luthiers de autor
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
                  Comunidad verificada (+18)
                </span>
              </div>
            </div>

            {/* Selector de Modo: Explorar vs Vender */}
            <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-5 space-y-3 shadow-sm lg:w-80 flex-shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4B5B51] block">
                Selector de Modo
              </span>
              <div className="space-y-2">
                <Link
                  href="/instrumentos"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#EDE6D6] hover:bg-[#E4DCcb] border border-[#D5CAB8] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-[#16231C]">Quiero Comprar</div>
                      <div className="text-[10px] text-[#4B5B51]">Buscar por mi presupuesto</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4B5B51]" />
                </Link>

                <Link
                  href="/publicar"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#DFEAE2] hover:bg-[#D5E4D8] border border-[#BCD3C3] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-[#16231C]">Quiero Vender</div>
                      <div className="text-[10px] text-[#4B5B51]">Publicar en 5 pasos honestos</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#23583C]" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Buscador de Presupuesto Real (Componente Central Protagonista) */}
          <div className="mt-10 sm:mt-12">
            <BudgetSearchBar />
          </div>
        </div>
      </section>

      {/* 3. Navegación por Familias (Grid Táctil) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
              Exploración por Taller
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#16231C] mt-1">
              Familias de Instrumentos
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5B51] max-w-md">
            Clasificación tradicional por método de emisión sonora, con subcategorías periciales y accesorios compatibles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => (
            <Link
              key={cat.id}
              href={`/instrumentos?category=${cat.id}`}
              className="group p-5 rounded-xl bg-[#FAF7F0] border border-[#D5CAB8] hover:border-[#23583C] transition-all shadow-[0_2px_8px_-2px_rgba(22,35,28,0.04)] hover:shadow-md flex flex-col justify-between h-44"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#3B674E]">
                  Familia
                </span>
                <h3 className="font-editorial text-lg font-semibold text-[#16231C] group-hover:text-[#23583C] transition-colors mt-0.5">
                  {cat.label}
                </h3>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-[#4B5B51] line-clamp-2">
                  {cat.subcategories.join(" · ")}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#23583C] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explorar</span>
                  <ArrowRight className="w-3 h-3 stroke-[1.75]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Oportunidades y Destacados: Dual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Bloque A: Oportunidades por Relación Precio / Calidad */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D5CAB8] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#23583C] mb-1">
                <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Oportunidades de Ocasión con Ahorro Real</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#16231C]">
                Instrumentos Usados con Ficha Transparente
              </h2>
            </div>
            <Link
              href="/instrumentos?condition=USED_EXCELLENT"
              className="text-xs sm:text-sm font-semibold text-[#16231C] hover:text-[#23583C] inline-flex items-center gap-1.5"
            >
              <span>Ver todas las oportunidades</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibleOpportunities.slice(0, 3).map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        </div>

        {/* Bloque B: Creaciones Destacadas de Luthiers */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D5CAB8] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B674E] mb-1">
                <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Rincón de Maestros Artesanos</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#16231C]">
                Piezas de Luthería de Autor
              </h2>
            </div>
            <Link
              href="/instrumentos?condition=LUTHIER_CRAFT"
              className="text-xs sm:text-sm font-semibold text-[#3B674E] hover:text-[#23583C] inline-flex items-center gap-1.5"
            >
              <span>Explorar catálogo artesanal</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {luthierCreations.slice(0, 2).map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sección Editorial: Manifiesto & El Valor del Trabajo Artesanal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
              <BookOpen className="w-4 h-4 stroke-[1.75]" />
              <span>Nuestra Filosofía</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16231C] leading-tight">
              &ldquo;Un buen instrumento no debe ser un privilegio inalcanzable, ni una compra a ciegas.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-[#4B5B51] leading-relaxed">
              En Sinfonía revertimos la frustración de buscar en marketplaces convencionales llenos de descripciones engañosas. 
              Aquí cada vendedor está obligado a declarar si el mástil está derecho, si las pastillas tienen zumbido o qué rayón tiene el barniz.
              Y para los artesanos de la luthería, ofrecemos un espacio digno de comercialización sin algoritmos opacos.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#23583C] text-[#FAF7F0] text-xs sm:text-sm font-medium hover:bg-[#173F2B] transition-colors shadow-sm"
              >
                <span>Leer Manifiesto de Honestidad</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
              </Link>
              <Link
                href="/publicar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EDE6D6] border border-[#D5CAB8] text-[#16231C] text-xs sm:text-sm font-medium hover:bg-[#E4DCcb] transition-colors"
              >
                <Hammer className="w-3.5 h-3.5 text-[#3B674E] stroke-[1.75]" />
                <span>¿Sos Luthier? Publicá en el Taller</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
