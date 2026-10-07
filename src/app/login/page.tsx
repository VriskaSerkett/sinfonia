"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"BUYER" | "SELLER" | "LUTHIER">("BUYER");

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-editorial text-3xl font-medium text-[#262422]">
          Acceso a Sinfonía
        </span>
        <p className="text-xs text-[#6E675F]">
          Ingresá para guardar tus instrumentos favoritos, publicar o acordar reservas por chat.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Selector de Rol */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
            Modo de ingreso
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole("BUYER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "BUYER"
                  ? "bg-[#262422] text-[#FAF8F5] border-[#262422]"
                  : "bg-[#FAF8F5] border-[#E6DFD5] text-[#6E675F]"
              }`}
            >
              Comprador
            </button>
            <button
              type="button"
              onClick={() => setRole("SELLER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "SELLER"
                  ? "bg-[#262422] text-[#FAF8F5] border-[#262422]"
                  : "bg-[#FAF8F5] border-[#E6DFD5] text-[#6E675F]"
              }`}
            >
              Particular
            </button>
            <button
              type="button"
              onClick={() => setRole("LUTHIER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "LUTHIER"
                  ? "bg-[#A67C52] text-[#FAF8F5] border-[#A67C52]"
                  : "bg-[#FAF8F5] border-[#E6DFD5] text-[#6E675F]"
              }`}
            >
              Luthier
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Acceso demo simulado correctamente.");
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@ejemplo.com"
              required
              className="w-full bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-sm text-[#262422] outline-none focus:border-[#C25E38]"
            />
          </div>

          <div className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg p-3 text-[11px] text-[#6E675F] space-y-1">
            <div className="flex items-center gap-1 font-semibold text-[#262422]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C25E38]" />
              <span>Verificación de Mayoría de Edad (+18)</span>
            </div>
            <p>
              Para publicar y comprar instrumentos es requisito legal ser mayor de 18 años.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Continuar a Sinfonía
          </button>
        </form>

        <div className="text-center text-xs text-[#6E675F] pt-2 border-t border-[#E6DFD5]">
          <Link href="/" className="hover:text-[#262422] underline underline-offset-2">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
