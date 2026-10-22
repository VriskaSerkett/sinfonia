"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"BUYER" | "SELLER" | "LUTHIER">("BUYER");

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-editorial text-3xl font-medium text-[#16231C]">
          Acceso a Sinfonía
        </span>
        <p className="text-xs text-[#4B5B51]">
          Ingresá para guardar tus instrumentos favoritos, publicar o acordar reservas por chat.
        </p>
      </div>

      <div className="bg-[#FAF7F0] border border-[#D5CAB8] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Selector de Rol */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
            Modo de ingreso
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole("BUYER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "BUYER"
                  ? "bg-[#23583C] text-[#FAF7F0] border-[#23583C]"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51]"
              }`}
            >
              Comprador
            </button>
            <button
              type="button"
              onClick={() => setRole("SELLER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "SELLER"
                  ? "bg-[#23583C] text-[#FAF7F0] border-[#23583C]"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51]"
              }`}
            >
              Particular
            </button>
            <button
              type="button"
              onClick={() => setRole("LUTHIER")}
              className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                role === "LUTHIER"
                  ? "bg-[#3B674E] text-[#FAF7F0] border-[#3B674E]"
                  : "bg-[#EDE6D6] border-[#D5CAB8] text-[#4B5B51]"
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5B51]">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@ejemplo.com"
              required
              className="w-full bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-sm text-[#16231C] outline-none focus:border-[#23583C]"
            />
          </div>

          <div className="bg-[#EDE6D6] border border-[#D5CAB8] rounded-lg p-3 text-[11px] text-[#4B5B51] space-y-1">
            <div className="flex items-center gap-1 font-semibold text-[#16231C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#23583C]" />
              <span>Verificación de Mayoría de Edad (+18)</span>
            </div>
            <p>
              Para publicar y comprar instrumentos es requisito legal ser mayor de 18 años.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#23583C] hover:bg-[#173F2B] text-[#FAF7F0] text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Continuar a Sinfonía
          </button>
        </form>

        <div className="text-center text-xs text-[#4B5B51] pt-2 border-t border-[#D5CAB8]">
          <Link href="/" className="hover:text-[#16231C] underline underline-offset-2">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
