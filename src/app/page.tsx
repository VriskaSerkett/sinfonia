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
  Award,
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
      <section className="relative pt-8 sm:pt-14 pb-8 border-b border-[#E6DFD5]/60 bg-gradient-to-b from-[#F7EFE6]/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFEA] border border-[#E6DFD5] text-xs font-semibold text-[#A67C52]">
                <Scale className="w-3.5 h-3.5 text-[#C25E38] stroke-[1.75]" />
                <span>Plataforma Basada en Presupuesto Real</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#262422] leading-[1.12]">
                Encontrá el instrumento exacto para tu oído y tu bolsillo.
              </h1>

              <p className="text-base sm:text-lg text-[#6E675F] leading-relaxed max-w-2xl font-light">
                Democratizamos el acceso a la música. Sin sobreprecios opacos, sin defectos ocultos.
                Cada publicación detalla de forma pericial calibración, desgastes honestos y accesorios incluidos.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#6E675F]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[1.75]" />
                  Declaración obligatoria de defectos
                </span>
                <span className="flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-[#A67C52] stroke-[1.75]" />
                  Acceso directo a Luthiers de autor
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                  Comunidad verificada (+18)
                </span>
              </div>
            </div>

            {/* Selector de Modo: Explorar vs Vender */}
            <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-5 space-y-3 shadow-sm lg:w-80 flex-shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E675F] block">
                Selector de Modo
              </span>
              <div className="space-y-2">
                <Link
                  href="/instrumentos"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFEA] border border-[#E6DFD5] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-[#262422]">Quiero Comprar</div>
                      <div className="text-[10px] text-[#6E675F]">Buscar por mi presupuesto</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6E675F]" />
                </Link>

                <Link
                  href="/publicar"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#FBF1EC] hover:bg-[#F7E5DB] border border-[#C25E38]/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-[#262422]">Quiero Vender</div>
                      <div className="text-[10px] text-[#6E675F]">Publicar en 5 pasos honestos</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C25E38]" />
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
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Exploración por Taller
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#262422] mt-1">
              Familias de Instrumentos
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6E675F] max-w-md">
            Clasificación tradicional por método de emisión sonora, con subcategorías periciales y accesorios compatibles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => (
            <Link
              key={cat.id}
              href={`/instrumentos?category=${cat.id}`}
              className="group p-5 rounded-xl bg-[#FFFFFF] border border-[#E6DFD5] hover:border-[#C25E38] transition-all shadow-[0_2px_8px_-2px_rgba(38,36,34,0.03)] hover:shadow-md flex flex-col justify-between h-44"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A67C52]">
                  Familia
                </span>
                <h3 className="font-editorial text-lg font-semibold text-[#262422] group-hover:text-[#C25E38] transition-colors mt-0.5">
                  {cat.label}
                </h3>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-[#6E675F] line-clamp-2">
                  {cat.subcategories.join(" · ")}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-[#C25E38] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6DFD5] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C25E38] mb-1">
                <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Oportunidades de Ocasión con Ahorro Real</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#262422]">
                Instrumentos Usados con Ficha Transparente
              </h2>
            </div>
            <Link
              href="/instrumentos?condition=USED_EXCELLENT"
              className="text-xs sm:text-sm font-semibold text-[#262422] hover:text-[#C25E38] inline-flex items-center gap-1.5"
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

        {/* Bloque B: Creaciones Destacadas de Luthiers (Sección 5.1 punto 5 context.md) */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6DFD5] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A67C52] mb-1">
                <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Rincón de Maestros Artesanos</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#262422]">
                Piezas de Luthería de Autor
              </h2>
            </div>
            <Link
              href="/instrumentos?condition=LUTHIER_CRAFT"
              className="text-xs sm:text-sm font-semibold text-[#A67C52] hover:text-[#C25E38] inline-flex items-center gap-1.5"
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
        <div className="bg-[#F3EFEA] border border-[#E6DFD5] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              <BookOpen className="w-4 h-4 stroke-[1.75]" />
              <span>Nuestra Filosofía</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#262422] leading-tight">
              &ldquo;Un buen instrumento no debe ser un privilegio inalcanzable, ni una compra a ciegas.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-[#6E675F] leading-relaxed">
              En Sinfonía revertimos la frustración de buscar en marketplaces convencionales llenos de descripciones engañosas. 
              Aquí cada vendedor está obligado a declarar si el mástil está derecho, si las pastillas tienen zumbido o qué rayón tiene el barniz.
              Y para los artesanos de la luthería, ofrecemos un espacio digno de comercialización sin algoritmos opacos.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#262422] text-[#FAF8F5] text-xs sm:text-sm font-medium hover:bg-[#3B3835] transition-colors"
              >
                <span>Leer Manifiesto de Honestidad</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
              </Link>
              <Link
                href="/publicar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6DFD5] text-[#262422] text-xs sm:text-sm font-medium hover:bg-[#FFFFFF] transition-colors"
              >
                <Hammer className="w-3.5 h-3.5 text-[#A67C52] stroke-[1.75]" />
                <span>¿Sos Luthier? Publicá en el Taller</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
