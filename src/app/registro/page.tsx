"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Hammer,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Sparkles,
  Lock,
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EFEA] border border-[#E6DFD5] text-xs font-semibold text-[#A67C52]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C25E38] stroke-[1.75]" />
          <span>Comunidad Verificada y Transparente</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#262422]">
          Creá tu Cuenta en Sinfonía
        </h1>
        <p className="text-xs sm:text-sm text-[#6E675F] max-w-md mx-auto">
          Accedé a compras honestas por presupuesto real o publicá tus instrumentos con respaldo técnico.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto stroke-[1.5]" />
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-semibold text-[#262422]">
                ¡Cuenta creada exitosamente!
              </h2>
              <p className="text-xs text-[#6E675F] max-w-sm mx-auto">
                {role === "LUTHIER"
                  ? "Tu postulación de taller pasará a revisión pericial. Mientras tanto podés explorar el catálogo."
                  : "Ya podés reservar instrumentos y acordar citas de prueba por chat privado."}
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/instrumentos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] rounded-lg text-xs font-semibold shadow-sm transition-colors"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Seleccioná tu perfil principal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("BUYER")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    role === "BUYER"
                      ? "bg-[#262422] text-[#FAF8F5] border-[#262422]"
                      : "bg-[#FAF8F5] border-[#E6DFD5] text-[#262422] hover:bg-[#F3EFEA]"
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
                      ? "bg-[#262422] text-[#FAF8F5] border-[#262422]"
                      : "bg-[#FAF8F5] border-[#E6DFD5] text-[#262422] hover:bg-[#F3EFEA]"
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
                      ? "bg-[#A67C52] text-[#FAF8F5] border-[#A67C52]"
                      : "bg-[#FAF8F5] border-[#E6DFD5] text-[#262422] hover:bg-[#F3EFEA]"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                  Nombre y Apellido completo *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Martín Guitart"
                  className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
                />
              </div>

              {role === "LUTHIER" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
                    Nombre del Taller de Luthería
                  </label>
                  <input
                    type="text"
                    required
                    value={workshopName}
                    onChange={(e) => setWorkshopName(e.target.value)}
                    placeholder="Ej. Taller Guitarras del Sur"
                    className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#A67C52]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                  Contraseña segura *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
                />
              </div>
            </div>

            {/* Certificación de Mayoría de Edad (Sección 6.1 context.md) */}
            <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#262422]">
                <ShieldCheck className="w-4 h-4 text-[#C25E38] stroke-[1.75]" />
                <span>Declaración de Mayoría de Edad (+18)</span>
              </div>
              <label className="flex items-start gap-2.5 text-xs text-[#6E675F] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={isAgeVerified}
                  onChange={(e) => setIsAgeVerified(e.target.checked)}
                  className="mt-0.5 rounded border-[#E6DFD5] text-[#C25E38] focus:ring-[#C25E38]"
                />
                <span>
                  Certifico bajo declaración jurada ser mayor de 18 años y aceptar las normas de honestidad técnica radical y acuerdos de compra segura de Sinfonía.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Crear cuenta en Sinfonía
            </button>
          </form>
        )}

        <div className="text-center text-xs text-[#6E675F] pt-2 border-t border-[#E6DFD5]">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login" className="text-[#262422] font-semibold underline underline-offset-2">
            Iniciá sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
