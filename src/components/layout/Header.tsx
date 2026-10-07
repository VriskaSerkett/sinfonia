"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  PlusCircle,
  ShieldCheck,
  User,
  Menu,
  X,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E6DFD5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Marca / Identidad */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#262422] group-hover:text-[#C25E38] transition-colors">
              Sinfonía
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#6E675F]">
              Mercado de Instrumentos & Luthería
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6E675F]">
            <Link
              href="/instrumentos"
              className="hover:text-[#262422] transition-colors flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#A67C52] stroke-[1.75]" />
              Catálogo por Presupuesto
            </Link>
            <Link
              href="/sobre-nosotros"
              className="hover:text-[#262422] transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#6E675F] stroke-[1.75]" />
              Manifiesto & Honestidad
            </Link>
            <Link
              href="/panel"
              className="hover:text-[#262422] transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#6E675F] stroke-[1.75]" />
              Panel Vendedor / Taller
            </Link>
          </nav>
        </div>

        {/* Acciones de escritorio */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#6E675F] bg-[#F3EFEA] px-3 py-1.5 rounded-md border border-[#E6DFD5]">
            <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
            <span>Reportes Periciales Transparentes</span>
          </div>

          <Link
            href="/publicar"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#F3EFEA] hover:bg-[#EAE4DC] text-[#262422] border border-[#E6DFD5] px-3.5 py-2 rounded-md transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
            <span>Publicar instrumento</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#262422] hover:bg-[#3B3835] text-[#FAF8F5] px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span>Ingresar</span>
          </Link>
        </div>

        {/* Botón hamburguesa en móvil */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/publicar"
            className="p-2 text-[#C25E38] bg-[#F3EFEA] border border-[#E6DFD5] rounded-md"
            title="Publicar"
          >
            <PlusCircle className="w-5 h-5 stroke-[1.75]" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#262422] bg-[#F3EFEA] border border-[#E6DFD5] rounded-md"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[1.75]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[1.75]" />
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E6DFD5] bg-[#FFFFFF] px-4 py-4 space-y-3 shadow-lg">
          <Link
            href="/instrumentos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#262422] py-2 border-b border-[#F3EFEA]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#A67C52] stroke-[1.75]" />
            <span>Catálogo por Presupuesto</span>
          </Link>

          <Link
            href="/sobre-nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#262422] py-2 border-b border-[#F3EFEA]"
          >
            <BookOpen className="w-4 h-4 text-[#6E675F] stroke-[1.75]" />
            <span>Manifiesto & Honestidad</span>
          </Link>

          <Link
            href="/panel"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#262422] py-2 border-b border-[#F3EFEA]"
          >
            <LayoutDashboard className="w-4 h-4 text-[#6E675F] stroke-[1.75]" />
            <span>Panel Vendedor / Taller</span>
          </Link>

          <Link
            href="/publicar"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#C25E38] py-2 border-b border-[#F3EFEA]"
          >
            <PlusCircle className="w-4 h-4 stroke-[1.75]" />
            <span>Publicar instrumento</span>
          </Link>

          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 text-sm font-semibold bg-[#262422] text-[#FAF8F5] py-2.5 rounded-lg w-full mt-2"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span>Ingresar a Sinfonía</span>
          </Link>
        </div>
      )}
    </header>
  );
}
