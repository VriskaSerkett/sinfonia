"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Hammer,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RegistroPage() {
  const [role, setRole] = useState<"BUYER" | "SELLER" | "LUTHIER">("BUYER");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [workshopName, setWorkshopName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgeVerified) {
      alert("Es requisito obligatorio declarar ser mayor de 18 años para operar en Sinfonía.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] border border-[#BFD4C5] text-xs font-semibold text-[#23583C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#23583C] stroke-[1.75]" />
          <span>Comunidad Verificada y Transparente</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#16231C]">
          Creá tu Cuenta en Sinfonía
        </h1>
        <p className="text-xs sm:text-sm text-[#4B5B51] max-w-md mx-auto">
          Accedé a compras honestas por presupuesto real o publicá tus instrumentos con respaldo técnico.
        </p>
      </div>

      <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#23583C] mx-auto stroke-[1.5]" />
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-semibold text-[#16231C]">
                ¡Cuenta creada exitosamente!
              </h2>
              <p className="text-xs text-[#4B5B51] max-w-sm mx-auto">
                {role === "LUTHIER"
                  ? "Tu postulación de taller pasará a revisión pericial. Mientras tanto podés explorar el catálogo."
                  : "Ya podés reservar instrumentos y acordar citas de prueba por chat privado."}
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/instrumentos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#23583C] hover:bg-[#173F2B] text-[#FAF7F0] rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Ir al catálogo por presupuesto</span>
                <ArrowRight className="w-4 h-4 stroke-[1.75]" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de Rol */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
                Seleccioná tu perfil principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("BUYER")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    role === "BUYER"
                      ? "bg-[#23583C] text-[#FAF7F0] border-[#23583C]"
                      : "bg-[#EDE6D6] border-[#D5CAB8] text-[#16231C] hover:bg-[#FAF7F0]"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>Músico</span>
                  </div>
                  <div className="text-[10px] opacity-80 mt-1">Busco comprar por presupuesto</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("SELLER")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    role === "SELLER"
                      ? "bg-[#23583C] text-[#FAF7F0] border-[#23583C]"
                      : "bg-[#EDE6D6] border-[#D5CAB8] text-[#16231C] hover:bg-[#FAF7F0]"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>Particular</span>
                  </div>
                  <div className="text-[10px] opacity-80 mt-1">Quiero vender instrumentos</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("LUTHIER")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    role === "LUTHIER"
                      ? "bg-[#3B674E] text-[#FAF7F0] border-[#3B674E]"
                      : "bg-[#EDE6D6] border-[#D5CAB8] text-[#16231C] hover:bg-[#FAF7F0]"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1">
                    <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>Luthier</span>
                  </div>
                  <div className="text-[10px] opacity-80 mt-1">Taller de autor artesanal</div>
                </button>
              </div>
            </div>

            {/* Campos Comunes */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
                  Nombre y Apellido completo *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Martín Guitart"
                  className="w-full bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-sm text-[#16231C] outline-none focus:border-[#23583C]"
                />
              </div>

              {role === "LUTHIER" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B674E]">
                    Nombre del Taller de Luthería
                  </label>
                  <input
                    type="text"
                    required
                    value={workshopName}
                    onChange={(e) => setWorkshopName(e.target.value)}
                    placeholder="Ej. Taller Guitarras del Sur"
                    className="w-full bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-sm text-[#16231C] outline-none focus:border-[#23583C]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-sm text-[#16231C] outline-none focus:border-[#23583C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
                  Contraseña segura *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-sm text-[#16231C] outline-none focus:border-[#23583C]"
                />
              </div>
            </div>

            {/* Certificación de Mayoría de Edad */}
            <div className="bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16231C]">
                <ShieldCheck className="w-4 h-4 text-[#23583C] stroke-[1.75]" />
                <span>Declaración de Mayoría de Edad (+18)</span>
              </div>
              <label className="flex items-start gap-2.5 text-xs text-[#4B5B51] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={isAgeVerified}
                  onChange={(e) => setIsAgeVerified(e.target.checked)}
                  className="mt-0.5 rounded border-[#D5CAB8] text-[#23583C] focus:ring-[#23583C]"
                />
                <span>
                  Certifico bajo declaración jurada ser mayor de 18 años y aceptar las normas de honestidad técnica radical y acuerdos de compra segura de Sinfonía.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#23583C] hover:bg-[#173F2B] text-[#FAF7F0] text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Crear cuenta en Sinfonía
            </button>
          </form>
        )}

        <div className="text-center text-xs text-[#4B5B51] pt-2 border-t border-[#D5CAB8]">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-[#23583C] font-semibold underline underline-offset-2">
            Iniciá sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
