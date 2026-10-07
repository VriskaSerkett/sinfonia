"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { InstrumentCategory, InstrumentCondition } from "@/types";
import {
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Hammer,
  Sparkles,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

export default function PublicarInstrumentoPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [category, setCategory] = useState<InstrumentCategory>("STRINGS");
  const [subCategory, setSubCategory] = useState("Guitarra Clásica");
  const [sellerType, setSellerType] = useState<"PARTICULAR" | "LUTHIER_AUTHOR">("PARTICULAR");
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState<InstrumentCondition>(InstrumentCondition.USED_EXCELLENT);
  const [flawsDescription, setFlawsDescription] = useState("");
  const [stringsCondition, setStringsCondition] = useState("NEW");
  const [accessories, setAccessories] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState<"ARS" | "USD">("ARS");
  const [isAgeCertified, setIsAgeCertified] = useState(false);

  // Mock Photo Upload & Safety Analysis State
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [photoVerified, setPhotoVerified] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  const steps = [
    { number: 1, title: "Familia y Categoría" },
    { number: 2, title: "Origen y Modelo" },
    { number: 3, title: "Fotos y Validación" },
    { number: 4, title: "Reporte de Defectos" },
    { number: 5, title: "Precio Honesto" },
  ];

  const handleSimulatePhotoUpload = () => {
    setIsAnalyzingPhoto(true);
    setTimeout(() => {
      setIsAnalyzingPhoto(false);
      setPhotoVerified(true);
      setUploadedPreview(
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80"
      );
    }, 1400);
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Encabezado */}
      <div className="space-y-2 border-b border-[#E6DFD5] pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
          <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
          <span>Protocolo de Publicación Transparente</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#262422]">
          Publicar Instrumento en Sinfonía
        </h1>
        <p className="text-sm text-[#6E675F] max-w-2xl">
          Completá el reporte guiado de 5 pasos. Tu publicación se indexará directamente
          en el buscador de presupuestos reales de compradores interesados.
        </p>
      </div>

      {/* Indicador de Pasos Físico */}
      <div className="grid grid-cols-5 gap-2 pb-4">
        {steps.map((s) => {
          const isDone = currentStep > s.number;
          const isCurrent = currentStep === s.number;
          return (
            <div
              key={s.number}
              className={`p-3 rounded-lg border text-xs transition-colors ${
                isCurrent
                  ? "bg-[#FFFFFF] border-[#C25E38] text-[#262422] shadow-sm ring-1 ring-[#C25E38]"
                  : isDone
                  ? "bg-[#FAF8F5] border-[#E6DFD5] text-emerald-800"
                  : "bg-[#F3EFEA]/50 border-transparent text-[#9E968D]"
              }`}
            >
              <div className="font-semibold flex items-center justify-between">
                <span>Paso {s.number}</span>
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 stroke-[1.75]" />}
              </div>
              <div className="text-[11px] truncate mt-0.5">{s.title}</div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta del Formulario Guiado */}
      <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* PASO 1: Familia y Categoría */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="font-editorial text-xl font-medium text-[#262422]">
              Paso 1: ¿A qué familia pertenece el instrumento?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.filter((c) => c.id !== "ALL").map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id as InstrumentCategory);
                    setSubCategory(cat.subcategories[0]);
                  }}
                  className={`p-4 rounded-lg border text-left text-xs transition-all ${
                    category === cat.id
                      ? "bg-[#FBF1EC] border-[#C25E38] text-[#C25E38] font-semibold"
                      : "bg-[#FAF8F5] border-[#E6DFD5] text-[#262422] hover:bg-[#F3EFEA]"
                  }`}
                >
                  <div className="text-sm font-semibold">{cat.label}</div>
                  <div className="text-[11px] text-[#6E675F] mt-1">
                    {cat.subcategories.slice(0, 3).join(", ")}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Subcategoría específica
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
              >
                {CATEGORIES.find((c) => c.id === category)?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* PASO 2: Origen y Título */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="font-editorial text-xl font-medium text-[#262422]">
              Paso 2: ¿Sos particular o luthier artesanal?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSellerType("PARTICULAR")}
                className={`p-5 rounded-lg border text-left space-y-1 transition-all ${
                  sellerType === "PARTICULAR"
                    ? "bg-[#FFFFFF] border-[#262422] ring-1 ring-[#262422]"
                    : "bg-[#FAF8F5] border-[#E6DFD5] text-[#6E675F]"
                }`}
              >
                <div className="text-sm font-semibold text-[#262422]">
                  Particular (Instrumento en desuso)
                </div>
                <p className="text-xs text-[#6E675F]">
                  Tengo un instrumento que compré o estudié con él y quiero venderlo con total transparencia.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSellerType("LUTHIER_AUTHOR")}
                className={`p-5 rounded-lg border text-left space-y-1 transition-all ${
                  sellerType === "LUTHIER_AUTHOR"
                    ? "bg-[#F7EFE6] border-[#A67C52] ring-1 ring-[#A67C52]"
                    : "bg-[#FAF8F5] border-[#E6DFD5] text-[#6E675F]"
                }`}
              >
                <div className="text-sm font-semibold text-[#A67C52] flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 stroke-[1.75]" />
                  <span>Luthier / Taller de Autor</span>
                </div>
                <p className="text-xs text-[#6E675F]">
                  Construcción artesanal, maderas nobles seleccionadas o calibración profesional pericial.
                </p>
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Título de la publicación (Marca, modelo y año aproximado)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Guitarra Clásica Yamaha C40 — Calibrada con cuerdas Savarez"
                className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
              />
            </div>
          </div>
        )}

        {/* PASO 3: Fotos y Validación de Instrumento (Interactiva) */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="font-editorial text-xl font-medium text-[#262422]">
              Paso 3: Carga y Validación de Fotografías
            </h2>

            {photoVerified && uploadedPreview ? (
              <div className="space-y-4">
                <div className="border border-[#E6DFD5] rounded-xl overflow-hidden bg-[#FAF8F5] p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-[#F3EFEA] flex-shrink-0">
                    <img src={uploadedPreview} alt="Subida" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <CheckCircle className="w-4 h-4 text-emerald-600 stroke-[1.75]" />
                      <span>Validación Pericial Aprobada</span>
                    </div>
                    <p className="text-[#6E675F]">
                      Modelo verificado: Instrumento acústico auténtico detectado. Sin marcas de agua publicitarias ni contenido inapropiado.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoVerified(false);
                    setUploadedPreview(null);
                  }}
                  className="text-xs text-[#6E675F] hover:text-[#262422] underline"
                >
                  Subir otra foto o ángulo de detalle
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E6DFD5] rounded-xl p-8 text-center space-y-4 bg-[#FAF8F5]">
                {isAnalyzingPhoto ? (
                  <div className="py-6 space-y-3">
                    <Loader2 className="w-8 h-8 text-[#C25E38] animate-spin mx-auto" />
                    <div className="text-sm font-semibold text-[#262422]">
                      Ejecutando filtro de seguridad y reconocimiento de instrumento...
                    </div>
                    <p className="text-xs text-[#6E675F]">
                      Validando que la fotografía corresponda a un instrumento musical real.
                    </p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-[#A67C52] stroke-[1.5] mx-auto" />
                    <div className="text-xs sm:text-sm font-semibold text-[#262422]">
                      Cargar foto principal del instrumento
                    </div>
                    <p className="text-xs text-[#6E675F] max-w-md mx-auto">
                      Requisito ético: Obligatorio subir foto de plano general y fotos en primer plano
                      de cualquier detalle o desgaste visible.
                    </p>
                    <button
                      type="button"
                      onClick={handleSimulatePhotoUpload}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFFFFF] border border-[#E6DFD5] text-xs font-semibold rounded-md hover:bg-[#F3EFEA] transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                      <span>Simular carga y validación de imagen</span>
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-4 text-xs text-[#6E675F] space-y-1">
              <span className="font-semibold text-[#262422] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                Pre-validación de seguridad de Sinfonía
              </span>
              <p>
                Las imágenes son analizadas automáticamente para verificar autenticidad y prevenir spam,
                armas o contenido ajeno al rubro musical.
              </p>
            </div>
          </div>
        )}

        {/* PASO 4: Declaración Obligatoria de Estado */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706]">
                <AlertTriangle className="w-4 h-4 stroke-[1.75]" />
                <span>Pilar de Honestidad Técnica</span>
              </div>
              <h2 className="font-editorial text-xl font-medium text-[#262422]">
                Paso 4: Declaración de Desperfectos y Estado Funcional
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Condición general del instrumento
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as InstrumentCondition)}
                className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
              >
                <option value={InstrumentCondition.USED_EXCELLENT}>
                  Usado Impecable (Mínimas marcas estéticas)
                </option>
                <option value={InstrumentCondition.USED_FAIR}>
                  Usado con desgaste natural (Sin fisuras)
                </option>
                <option value={InstrumentCondition.NEEDS_REPAIR}>
                  Oportunidad / A calibrar o reparar detalle
                </option>
                <option value={InstrumentCondition.LUTHIER_CRAFT}>
                  Pieza nueva de luthier
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Describí con exactitud cualquier raya, desgaste o calibración requerida *
              </label>
              <textarea
                rows={3}
                value={flawsDescription}
                onChange={(e) => setFlawsDescription(e.target.value)}
                placeholder="Ej. 'Traste 12 tiene leve trasteo si se pulsa fuerte', 'Marca superficial en tapa trasera de 1cm', 'Cuerdas viejas, requiere juego nuevo'..."
                className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
              />
              <span className="text-[11px] text-[#A67C52]">
                * Esta honestidad acelera tu venta: los compradores valoran saber la verdad antes de probarlo.
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Accesorios que entregás incluidos
              </label>
              <input
                type="text"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                placeholder="Ej. Funda acolchada, Afinador clip, Cable de 3m, Soporte plegable..."
                className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
              />
            </div>
          </div>
        )}

        {/* PASO 5: Precio y Presupuesto Sugerido */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="font-editorial text-xl font-medium text-[#262422]">
              Paso 5: Precio y Declaración de Mayoría de Edad
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                  Moneda
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as "ARS" | "USD")}
                  className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
                >
                  <option value="ARS">Pesos Argentinos (ARS $)</option>
                  <option value="USD">Dólares Estadounidenses (USD U$S)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                  Precio de publicación
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej. 350000"
                  className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] font-mono outline-none focus:border-[#C25E38]"
                />
              </div>
            </div>

            {/* Restricción de edad y declaración ética obligatoria */}
            <div className="pt-4 border-t border-[#E6DFD5] space-y-3">
              <label className="flex items-start gap-3 text-xs text-[#262422] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAgeCertified}
                  onChange={(e) => setIsAgeCertified(e.target.checked)}
                  className="mt-0.5 rounded border-[#E6DFD5] text-[#C25E38] focus:ring-[#C25E38]"
                />
                <span>
                  Certifico bajo declaración jurada ser mayor de 18 años y que la información técnica y de defectos declarada es verídica y constatable al momento de la entrega o prueba del instrumento.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Botones de Navegación del Flujo */}
        <div className="pt-6 border-t border-[#E6DFD5] flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#6E675F] hover:text-[#262422] disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Paso anterior</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#262422] text-[#FAF8F5] text-xs font-semibold hover:bg-[#3B3835] transition-colors cursor-pointer"
            >
              <span>Continuar al paso {currentStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!isAgeCertified || !price}
              onClick={() => alert("¡Publicación enviada a verificación técnica de Sinfonía!")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C25E38] text-[#FAF8F5] text-xs font-semibold hover:bg-[#AA4F2D] disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 stroke-[1.75]" />
              <span>Publicar Instrumento Transparente</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
