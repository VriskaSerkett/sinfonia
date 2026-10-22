"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import BudgetSearchBar from "@/components/search/BudgetSearchBar";
import InstrumentCard from "@/components/instruments/InstrumentCard";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";
import { InstrumentCategory, InstrumentCondition } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  SlidersHorizontal,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("category") as InstrumentCategory | "ALL") || "ALL";
  const initialBudget = searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : 3500000;
  const initialCurrency = (searchParams.get("currency") as "ARS" | "USD") || "ARS";
  const initialCondition = (searchParams.get("condition") as InstrumentCondition | "ALL") || "ALL";
  const initialLuthier = searchParams.get("luthier") === "true";

  const [filters, setFilters] = useState({
    query: initialQuery,
    category: initialCategory,
    maxBudget: initialBudget,
    currency: initialCurrency,
    condition: initialCondition,
    onlyLuthier: initialLuthier,
  });

  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "luthier_first" | "newest">("price_asc");

  const filteredInstruments = useMemo(() => {
    let list = MOCK_INSTRUMENTS.filter((item) => {
      // Filtrar por divisa y presupuesto máximo
      if (item.currency === filters.currency && item.price > filters.maxBudget) {
        return false;
      }

      // Filtrar por categoría
      if (filters.category !== "ALL" && item.category !== filters.category) {
        return false;
      }

      // Filtrar por luthier
      if (filters.onlyLuthier && item.sellerType !== "LUTHIER_AUTHOR") {
        return false;
      }

      // Filtrar por condición
      if (filters.condition !== "ALL" && item.condition !== filters.condition) {
        return false;
      }

      // Búsqueda textual
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSub && !matchesDesc) {
          return false;
        }
      }

      return true;
    });

    // Ordenamiento
    return list.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "luthier_first") {
        if (a.sellerType === "LUTHIER_AUTHOR" && b.sellerType !== "LUTHIER_AUTHOR") return -1;
        if (b.sellerType === "LUTHIER_AUTHOR" && a.sellerType !== "LUTHIER_AUTHOR") return 1;
        return a.price - b.price;
      }
      return 0;
    });
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header del Catálogo */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
          <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>Inventario Verificado</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16231C]">
          Catálogo Filtrado por Presupuesto Real
        </h1>
        <p className="text-sm text-[#4B5B51] max-w-2xl">
          Ajustá el control deslizante para descubrir instrumentos acústicos, eléctricos y de luthería
          que no excedan tu capacidad de inversión real.
        </p>
      </div>

      {/* Buscador de Presupuesto Integrado */}
      <BudgetSearchBar
        initialBudget={filters.maxBudget}
        initialCategory={filters.category}
        initialQuery={filters.query}
        initialCurrency={filters.currency}
        initialCondition={filters.condition}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Resultados de la búsqueda y Ordenamiento */}
      <div className="pt-6 border-t border-[#D5CAB8] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#4B5B51]">
          <div>
            Mostrando{" "}
            <strong className="text-[#16231C]">{filteredInstruments.length} instrumentos</strong>{" "}
            dentro del presupuesto de hasta{" "}
            <strong className="text-[#23583C] font-mono">
              {formatCurrency(filters.maxBudget, filters.currency)}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-[#16231C] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 stroke-[1.75]" />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-md px-2.5 py-1.5 text-xs text-[#16231C] outline-none focus:border-[#23583C]"
            >
              <option value="price_asc">Menor precio primero</option>
              <option value="price_desc">Mayor precio primero</option>
              <option value="luthier_first">Piezas de Luthier primero</option>
            </select>
          </div>
        </div>

        {filteredInstruments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstruments.map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-12 text-center space-y-3 max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-[#3B674E] stroke-[1.75] mx-auto" />
            <h3 className="font-editorial text-xl font-semibold text-[#16231C]">
              No hay instrumentos publicados en este rango exacto
            </h3>
            <p className="text-xs text-[#4B5B51] leading-relaxed">
              Probá ampliar el presupuesto en el control deslizante o explorar otra categoría musical.
              Los instrumentos honestos se publican y reservan con rapidez.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#4B5B51]">
          Cargando catálogo pericial...
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
