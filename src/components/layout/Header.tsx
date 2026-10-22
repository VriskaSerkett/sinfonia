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
    <header className="sticky top-0 z-40 bg-[#EDE6D6]/95 backdrop-blur-sm border-b border-[#D5CAB8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Marca / Identidad */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#16231C] group-hover:text-[#23583C] transition-colors">
              Sinfonía
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#4B5B51]">
              Mercado de Instrumentos & Luthería
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4B5B51]">
            <Link
              href="/instrumentos"
              className="hover:text-[#16231C] transition-colors flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#3B674E] stroke-[1.75]" />
              Catálogo por Presupuesto
            </Link>
            <Link
              href="/sobre-nosotros"
              className="hover:text-[#16231C] transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
              Manifiesto & Honestidad
            </Link>
            <Link
              href="/panel"
              className="hover:text-[#16231C] transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
              Panel Vendedor / Taller
            </Link>
          </nav>
        </div>

        {/* Acciones de escritorio */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#4B5B51] bg-[#FAF7F0] px-3 py-1.5 rounded-md border border-[#D5CAB8]">
            <ShieldCheck className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
            <span>Reportes Periciales Transparentes</span>
          </div>

          <Link
            href="/publicar"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#DFEAE2] hover:bg-[#D5E4D8] text-[#16231C] border border-[#BCD3C3] px-3.5 py-2 rounded-md transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
            <span>Publicar instrumento</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#23583C] hover:bg-[#173F2B] text-[#FAF7F0] px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span>Ingresar</span>
          </Link>
        </div>

        {/* Botón hamburguesa en móvil */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/publicar"
            className="p-2 text-[#23583C] bg-[#FAF7F0] border border-[#D5CAB8] rounded-md"
            title="Publicar"
          >
            <PlusCircle className="w-5 h-5 stroke-[1.75]" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#16231C] bg-[#FAF7F0] border border-[#D5CAB8] rounded-md"
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
        <div className="sm:hidden border-b border-[#D5CAB8] bg-[#FAF7F0] px-4 py-4 space-y-3 shadow-lg">
          <Link
            href="/instrumentos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#16231C] py-2 border-b border-[#E6DECE]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#3B674E] stroke-[1.75]" />
            <span>Catálogo por Presupuesto</span>
          </Link>

          <Link
            href="/sobre-nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#16231C] py-2 border-b border-[#E6DECE]"
          >
            <BookOpen className="w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
            <span>Manifiesto & Honestidad</span>
          </Link>

          <Link
            href="/panel"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#16231C] py-2 border-b border-[#E6DECE]"
          >
            <LayoutDashboard className="w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
            <span>Panel Vendedor / Taller</span>
          </Link>

          <Link
            href="/publicar"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-[#23583C] py-2 border-b border-[#E6DECE]"
          >
            <PlusCircle className="w-4 h-4 stroke-[1.75]" />
            <span>Publicar instrumento</span>
          </Link>

          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 text-sm font-semibold bg-[#23583C] text-[#FAF7F0] py-2.5 rounded-lg w-full mt-2"
          >
            <User className="w-4 h-4 stroke-[1.75]" />
            <span>Ingresar a Sinfonía</span>
          </Link>
        </div>
      )}
    </header>
  );
}
