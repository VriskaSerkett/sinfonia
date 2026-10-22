"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Compass,
  Hammer,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Coins,
  Music2,
  Wind,
  Drum,
  Piano,
  Headphones,
} from "lucide-react";
import { CATEGORIES, BUDGET_PRESETS } from "@/lib/constants";
import { InstrumentCategory, InstrumentCondition } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";

interface BudgetSearchBarProps {
  initialBudget?: number;
  initialCategory?: InstrumentCategory | "ALL";
  initialQuery?: string;
  initialCondition?: InstrumentCondition | "ALL";
  initialCurrency?: "ARS" | "USD";
  onFilterChange?: (filters: {
    query: string;
    category: InstrumentCategory | "ALL";
    maxBudget: number;
    currency: "ARS" | "USD";
    condition: InstrumentCondition | "ALL";
    onlyLuthier: boolean;
  }) => void;
  className?: string;
}

export default function BudgetSearchBar({
  initialBudget = 450000,
  initialCategory = "ALL",
  initialQuery = "",
  initialCondition = "ALL",
  initialCurrency = "ARS",
  onFilterChange,
  className,
}: BudgetSearchBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<InstrumentCategory | "ALL">(initialCategory);
  const [currency, setCurrency] = useState<"ARS" | "USD">(initialCurrency);
  const [maxBudget, setMaxBudget] = useState(initialBudget);
  const [condition, setCondition] = useState<InstrumentCondition | "ALL">(initialCondition);
  const [onlyLuthier, setOnlyLuthier] = useState(false);
  const [isEditingDirectBudget, setIsEditingDirectBudget] = useState(false);

  // Rangos dinámicos según divisa
  const minSlider = currency === "ARS" ? 20000 : 50;
  const maxSlider = currency === "ARS" ? 3500000 : 4000;
  const stepSlider = currency === "ARS" ? 10000 : 25;

  const handleCurrencyToggle = (newCurrency: "ARS" | "USD") => {
    if (newCurrency === currency) return;
    setCurrency(newCurrency);
    if (newCurrency === "USD") {
      setMaxBudget(Math.max(50, Math.round(maxBudget / 1000)));
    } else {
      setMaxBudget(Math.min(3500000, Math.round(maxBudget * 1000)));
    }
  };

  const handleApplyPreset = (amountARS: number, amountUSD: number) => {
    const targetAmount = currency === "ARS" ? amountARS : amountUSD;
    setMaxBudget(targetAmount);
  };

  const handleReset = () => {
    setQuery("");
    setCategory("ALL");
    setMaxBudget(currency === "ARS" ? 450000 : 450);
    setCondition("ALL");
    setOnlyLuthier(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const currentFilters = {
      query,
      category,
      maxBudget,
      currency,
      condition,
      onlyLuthier,
    };

    if (onFilterChange) {
      onFilterChange(currentFilters);
      return;
    }

    // Navegar al catálogo por App Router con parámetros limpios
    startTransition(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (category !== "ALL") params.set("category", category);
      if (maxBudget) params.set("maxBudget", maxBudget.toString());
      params.set("currency", currency);
      if (condition !== "ALL") params.set("condition", condition);
      if (onlyLuthier) params.set("luthier", "true");

      router.push(`/instrumentos?${params.toString()}`);
    });
  };

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case "STRINGS":
        return <Music2 className="w-3.5 h-3.5 stroke-[1.75]" />;
      case "WINDS":
        return <Wind className="w-3.5 h-3.5 stroke-[1.75]" />;
      case "PERCUSSION":
        return <Drum className="w-3.5 h-3.5 stroke-[1.75]" />;
      case "KEYBOARDS":
        return <Piano className="w-3.5 h-3.5 stroke-[1.75]" />;
      case "AUDIO_ACCESSORIES":
        return <Headphones className="w-3.5 h-3.5 stroke-[1.75]" />;
      default:
        return <Compass className="w-3.5 h-3.5 stroke-[1.75]" />;
    }
  };

  return (
    <section
      aria-label="Buscador por Presupuesto Real"
      className={cn(
        "bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl shadow-[0_4px_24px_-4px_rgba(22,35,28,0.06)] p-6 sm:p-8 transition-all",
        className
      )}
    >
      {/* Cabecera Técnica del Buscador: Identidad de Taller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5CAB8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#EDE6D6] border border-[#D5CAB8] flex items-center justify-center text-[#23583C]">
            <SlidersHorizontal className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#3B674E]">
                Herramienta Pericial
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5CAB8]" />
              <span className="text-[11px] text-[#4B5B51]">Honestidad Técnica Garantizada</span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#16231C]">
              Buscador por Presupuesto Real
            </h3>
          </div>
        </div>

        {/* Divisa y Reset */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#4B5B51] hover:text-[#16231C] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-[#EDE6D6] border border-transparent hover:border-[#D5CAB8] transition-colors"
            title="Restablecer filtros"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>

          <div
            role="group"
            aria-label="Selector de divisa"
            className="inline-flex p-1 bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg text-xs font-medium"
          >
            <button
              type="button"
              onClick={() => handleCurrencyToggle("ARS")}
              className={cn(
                "px-3 py-1 rounded transition-colors",
                currency === "ARS"
                  ? "bg-[#23583C] text-[#FAF7F0] shadow-sm font-semibold"
                  : "text-[#4B5B51] hover:text-[#16231C]"
              )}
            >
              ARS ($)
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyToggle("USD")}
              className={cn(
                "px-3 py-1 rounded transition-colors",
                currency === "USD"
                  ? "bg-[#23583C] text-[#FAF7F0] shadow-sm font-semibold"
                  : "text-[#4B5B51] hover:text-[#16231C]"
              )}
            >
              USD (U$S)
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Fila 1: Entrada de texto e instrumento específico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-12">
            <label
              htmlFor="instrument-search"
              className="block text-xs font-medium uppercase tracking-wider text-[#4B5B51] mb-1.5"
            >
              ¿Qué instrumento o pieza estás buscando?
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5B51] stroke-[1.75]" />
              <input
                id="instrument-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej. Guitarra criolla de estudio, Saxo alto Yamaha, Bajo 4 cuerdas, Platillo ride..."
                className="w-full bg-[#EDE6D6] hover:bg-[#FAF7F0] focus:bg-[#FAF7F0] text-[#16231C] placeholder:text-[#728478] text-sm pl-10 pr-4 py-3 rounded-lg border border-[#D5CAB8] focus:border-[#23583C] focus:ring-1 focus:ring-[#23583C] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Fila 2: Selector Táctil de Familias Musicales con Lucide Icons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium uppercase tracking-wider text-[#4B5B51]">
              Familia del instrumento
            </label>
            <span className="text-[11px] text-[#3B674E] font-medium hidden sm:inline">
              Filtro directo de taller
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex flex-col justify-between h-[68px]",
                    isSelected
                      ? "bg-[#DFEAE2] border-[#23583C] text-[#23583C] shadow-[0_1px_3px_rgba(35,88,60,0.15)] font-semibold"
                      : "bg-[#EDE6D6] border-[#D5CAB8] text-[#16231C] hover:bg-[#FAF7F0] hover:border-[#C0B29C]"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(cat.id)}
                    <span className="line-clamp-1 font-semibold">{cat.label}</span>
                  </div>
                  <span className="text-[10px] text-[#4B5B51] line-clamp-1">
                    {cat.subcategories.slice(0, 2).join(", ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fila 3: El Núcleo — Presupuesto Máximo Real */}
        <div className="p-5 sm:p-6 bg-[#EDE6D6] border border-[#D5CAB8] rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
                Techo de inversión
              </span>
              <p className="text-sm text-[#4B5B51]">
                Mostraremos únicamente opciones transparentes que no superen este valor.
              </p>
            </div>

            {/* Display Numérico / Edición Directa */}
            <div className="flex items-center gap-2 bg-[#FAF7F0] px-4 py-2 rounded-lg border border-[#D5CAB8] self-start sm:self-auto shadow-sm">
              <Coins className="w-4 h-4 text-[#3B674E] stroke-[1.75]" />
              <span className="text-xs uppercase font-medium text-[#4B5B51]">Hasta:</span>
              {isEditingDirectBudget ? (
                <input
                  type="number"
                  autoFocus
                  min={minSlider}
                  max={maxSlider}
                  value={maxBudget}
                  onBlur={() => setIsEditingDirectBudget(false)}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="font-editorial text-2xl font-semibold text-[#16231C] w-32 border-b border-[#23583C] outline-none bg-transparent"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingDirectBudget(true)}
                  title="Hacé clic para escribir un monto exacto"
                  className="font-editorial text-2xl sm:text-3xl font-semibold text-[#16231C] tracking-tight hover:text-[#23583C] transition-colors cursor-text"
                >
                  {formatCurrency(maxBudget, currency)}
                </button>
              )}
            </div>
          </div>

          {/* Slider Físico / Táctil */}
          <div className="space-y-2 pt-2">
            <input
              type="range"
              min={minSlider}
              max={maxSlider}
              step={stepSlider}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full slider-tactile"
              aria-label="Control deslizante de presupuesto máximo"
            />
            <div className="flex justify-between text-[11px] text-[#4B5B51] font-mono">
              <span>{formatCurrency(minSlider, currency)}</span>
              <span>{formatCurrency(Math.round(maxSlider / 2), currency)}</span>
              <span>{formatCurrency(maxSlider, currency)}+</span>
            </div>
          </div>

          {/* Presets Rápidos de Presupuesto */}
          <div className="pt-2 border-t border-[#D5CAB8]/80">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3B674E] stroke-[1.75]" />
              <span className="text-xs font-medium text-[#4B5B51]">
                Sugerencias por etapa de estudio:
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {BUDGET_PRESETS.map((preset) => {
                const targetValue = currency === "ARS" ? preset.amountARS : preset.amountUSD;
                const isActive = maxBudget === targetValue;

                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset.amountARS, preset.amountUSD)}
                    className={cn(
                      "p-2.5 rounded-lg border text-left transition-all",
                      isActive
                        ? "bg-[#FAF7F0] border-[#23583C] text-[#16231C] ring-1 ring-[#23583C]"
                        : "bg-[#E5DDCB] border-[#D5CAB8] text-[#16231C] hover:bg-[#FAF7F0]"
                    )}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{preset.label}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#23583C] stroke-[1.75]" />}
                    </div>
                    <div className="text-[11px] text-[#3B674E] font-mono mt-0.5">
                      {formatCurrency(targetValue, currency)}
                    </div>
                    <div className="text-[10px] text-[#4B5B51] line-clamp-1 mt-1">
                      {preset.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fila 4: Filtros Éticos de Estado & Origen */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#4B5B51] mr-1">Filtrar por origen:</span>

            {/* Switch Luthier */}
            <button
              type="button"
              onClick={() => setOnlyLuthier(!onlyLuthier)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                onlyLuthier
                  ? "bg-[#DFEAE2] border-[#23583C] text-[#23583C] font-semibold"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51] hover:text-[#16231C]"
              )}
            >
              <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Solo piezas de Luthier</span>
            </button>

            {/* Chips de Condición */}
            <button
              type="button"
              onClick={() =>
                setCondition(
                  condition === InstrumentCondition.USED_EXCELLENT
                    ? "ALL"
                    : InstrumentCondition.USED_EXCELLENT
                )
              }
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                condition === InstrumentCondition.USED_EXCELLENT
                  ? "bg-[#E5ECE7] border-[#23583C] text-[#16231C] font-semibold"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51] hover:text-[#16231C]"
              )}
            >
              <span>Usados impecables</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setCondition(
                  condition === InstrumentCondition.NEEDS_REPAIR
                    ? "ALL"
                    : InstrumentCondition.NEEDS_REPAIR
                )
              }
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                condition === InstrumentCondition.NEEDS_REPAIR
                  ? "bg-[#FEF3C7] border-[#C0681E] text-[#C0681E] font-semibold"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51] hover:text-[#16231C]"
              )}
              title="Instrumentos a menor costo con reparaciones o calibración pendiente declarada"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#C0681E] stroke-[1.75]" />
              <span>Oportunidad a calibrar</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#4B5B51]">
            <ShieldCheck className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
            <span>Sin defectos ocultos ni comisiones abusivas</span>
          </div>
        </div>

        {/* Fila 5: Botón Principal de Búsqueda y Feedback */}
        <div className="pt-4 border-t border-[#D5CAB8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#4B5B51] leading-relaxed">
            Explorando{" "}
            <strong className="text-[#16231C]">
              {category === "ALL"
                ? "todas las categorías"
                : CATEGORIES.find((c) => c.id === category)?.label}
            </strong>{" "}
            con presupuesto límite de{" "}
            <strong className="text-[#23583C] font-mono">
              {formatCurrency(maxBudget, currency)}
            </strong>
            .
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#23583C] hover:bg-[#173F2B] active:bg-[#123121] text-[#FAF7F0] text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all disabled:opacity-75 cursor-pointer"
          >
            <Compass className={cn("w-4 h-4 stroke-[2]", isPending && "animate-spin")} />
            <span>{isPending ? "Buscando en catálogo..." : "Buscar opciones a mi alcance"}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
