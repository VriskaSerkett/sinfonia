import Link from "next/link";
import { ShieldAlert, Award, Hammer, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F3EFEA] border-t border-[#E6DFD5] text-[#262422] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Manifiesto */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-editorial text-2xl font-medium tracking-tight">Sinfonía</span>
            <p className="text-sm text-[#6E675F] leading-relaxed max-w-md">
              Democratizamos el acceso a la música uniendo a músicos con presupuesto concreto,
              vendedores honestos y luthiers de autor. Cada ficha técnica está sometida al principio
              de <strong>honestidad técnica radical</strong>: sin sorpresas ni defectos ocultos.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#6E675F]">
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E6DFD5] px-2.5 py-1 rounded">
                <Hammer className="w-3.5 h-3.5 text-[#A67C52]" />
                Luthiers Verificados
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E6DFD5] px-2.5 py-1 rounded">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C25E38]" />
                Validación de Edad (+18) y Seguridad
              </span>
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
              Exploración Técnica
            </h4>
            <ul className="space-y-2 text-sm text-[#262422]">
              <li>
                <Link href="/instrumentos?category=STRINGS" className="hover:text-[#C25E38] transition-colors">
                  Cuerdas Frotadas y Pulsadas
                </Link>
              </li>
              <li>
                <Link href="/instrumentos?category=WINDS" className="hover:text-[#C25E38] transition-colors">
                  Vientos de Madera y Metal
                </Link>
              </li>
              <li>
                <Link href="/instrumentos?category=PERCUSSION" className="hover:text-[#C25E38] transition-colors">
                  Percusión y Baterías
                </Link>
              </li>
              <li>
                <Link href="/instrumentos?category=KEYBOARDS" className="hover:text-[#C25E38] transition-colors">
                  Pianos y Teclados
                </Link>
              </li>
              <li>
                <Link href="/instrumentos?condition=LUTHIER_CRAFT" className="hover:text-[#C25E38] transition-colors">
                  Instrumentos de Luthería
                </Link>
              </li>
            </ul>
          </div>

          {/* Ética & Comunidad */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
              Confianza & Protocolo
            </h4>
            <ul className="space-y-2 text-sm text-[#262422]">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-[#C25E38] transition-colors">
                  Código de Honestidad Pericial
                </Link>
              </li>
              <li>
                <Link href="/publicar" className="hover:text-[#C25E38] transition-colors">
                  Guía para Vender tu Instrumento
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros#luthiers" className="hover:text-[#C25E38] transition-colors">
                  Postulación para Talleres de Autor
                </Link>
              </li>
              <li>
                <span className="text-[#6E675F] text-xs">
                  Moderación activa de imágenes contra réplicas y publicaciones engañosas.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E675F]">
          <p>© 2026 Sinfonía Marketplace. Hecho con respeto al oficio sonoro.</p>
          <p className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#A67C52]" />
            Búsqueda basada en presupuesto real, no en algoritmos opacos.
          </p>
        </div>
      </div>
    </footer>
  );
}
