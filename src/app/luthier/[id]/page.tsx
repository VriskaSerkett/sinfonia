import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Hammer,
  Award,
  MapPin,
  Calendar,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import InstrumentCard from "@/components/instruments/InstrumentCard";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";

export interface LuthierProfileData {
  id: string;
  name: string;
  workshopName: string;
  location: string;
  experienceYears: number;
  bio: string;
  specialty: string;
  curedWoodVault: string[];
  certifications: string[];
  avatarUrl: string;
  coverUrl: string;
}

export const MOCK_LUTHIERS: Record<string, LuthierProfileData> = {
  "hernan-morales": {
    id: "hernan-morales",
    name: "Hernán Morales",
    workshopName: "Taller de Luthería Morales — San Telmo",
    location: "San Telmo, Buenos Aires",
    experienceYears: 24,
    specialty: "Guitarras Clásicas, Románticas y Cuatro Venezolano",
    bio: "Dedicado a la luthería de concierto tradicional desde el año 2002. Cada instrumento es concebido individualmente a mano, utilizando encolados tradicionales con cola animal caliente y acabado a muñequilla con goma laca natural sin barnices sintéticos que ahoguen la resonancia.",
    curedWoodVault: [
      "Pino Abeto Alemán (Selección 15 años de estacionamiento)",
      "Cedro de Canadá grado Master",
      "Algarrobo Negro chaqueño curado",
      "Ébano de Gabón para diapasones",
      "Nogal Criollo seleccionado",
    ],
    certifications: [
      "Maestro Luthier de la Asociación Argentina de Luthiers (AAL)",
      "Expositor en la Bienal de Luthería de Buenos Aires",
      "Certificado Pericial de Maderas de Origen Sostenible",
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1400&q=80",
  },
  "la-fragua": {
    id: "la-fragua",
    name: "Taller La Fragua (Damián Silva)",
    workshopName: "Taller de Percusión & Resonancia La Fragua",
    location: "Tigre, Buenos Aires",
    experienceYears: 16,
    specialty: "Cajones Flamencos, Tambores de Madera y Percusión Acústica",
    bio: "Especializados en percusión de autor con maderas nativas del delta y fenólicos de alta densidad acústica. Diseños con sistema patentado de afinación de bordones sin necesidad de herramientas externas.",
    curedWoodVault: [
      "Cedro Misionero estacionado en taller",
      "Guatambú macizo para refuerzos estructurales",
      "Abedul fenólico de 12 capas",
    ],
    certifications: [
      "Artesano Registrado de la Región Metropolitana Norte",
      "Sello de Calidad Acústica Sinfonía",
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1400&q=80",
  },
};

export function generateStaticParams() {
  return Object.keys(MOCK_LUTHIERS).map((id) => ({ id }));
}

interface LuthierPageProps {
  params: Promise<{ id: string }>;
}

export default async function LuthierProfilePage({ params }: LuthierPageProps) {
  const { id } = await params;
  const luthier = MOCK_LUTHIERS[id] || MOCK_LUTHIERS["hernan-morales"];

  if (!luthier) {
    notFound();
  }

  // Instrumentos de este luthier en catálogo
  const instruments = MOCK_INSTRUMENTS.filter(
    (item) => item.sellerType === "LUTHIER_AUTHOR"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Botón de retorno */}
      <div>
        <Link
          href="/instrumentos?condition=LUTHIER_CRAFT"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E675F] hover:text-[#262422] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
          <span>Volver a instrumentos de Luthería</span>
        </Link>
      </div>

      {/* Cabecera del Taller con Portada Táctil */}
      <div className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-2xl overflow-hidden shadow-sm">
        <div className="h-48 sm:h-64 bg-[#F3EFEA] relative overflow-hidden">
          <img
            src={luthier.coverUrl}
            alt={luthier.workshopName}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262422]/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2 text-[#FAF8F5] text-xs">
            <span className="bg-[#C25E38] px-2.5 py-1 rounded font-semibold flex items-center gap-1.5">
              <Hammer className="w-3.5 h-3.5 stroke-[1.75]" />
              Taller de Autor Verificado
            </span>
            <span className="hidden sm:inline bg-[#262422]/60 px-2.5 py-1 rounded backdrop-blur-xs">
              {luthier.experienceYears} años de trayectoria
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A67C52]">
                {luthier.specialty}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#262422]">
                {luthier.workshopName}
              </h1>
              <p className="text-xs sm:text-sm text-[#6E675F] flex items-center gap-3 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A67C52] stroke-[1.75]" />
                  {luthier.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#6E675F] stroke-[1.75]" />
                  Oficio desde 2002
                </span>
              </p>
            </div>

            <Link
              href="/mensajes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C25E38] hover:bg-[#AA4F2D] text-[#FAF8F5] text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 stroke-[1.75]" />
              <span>Contactar al Taller</span>
            </Link>
          </div>

          <p className="text-sm text-[#6E675F] leading-relaxed max-w-3xl">
            {luthier.bio}
          </p>

          {/* Banco de maderas estacionadas del taller */}
          <div className="pt-4 border-t border-[#E6DFD5] space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] uppercase tracking-wider">
              <TreePine className="w-4 h-4 stroke-[1.75]" />
              <span>Maderas Estacionadas en Banco de Trabajo</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {luthier.curedWoodVault.map((wood, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] border border-[#E6DFD5] rounded-md px-3 py-2 text-xs text-[#262422] font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                  <span>{wood}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificaciones y Membresías */}
          <div className="pt-4 border-t border-[#E6DFD5] space-y-2">
            <span className="text-xs font-semibold text-[#6E675F] uppercase tracking-wider block">
              Garantías de Oficio & Certificaciones
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {luthier.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-[#F3EFEA] border border-[#E6DFD5] px-3 py-1 rounded text-[#262422]"
                >
                  <Award className="w-3.5 h-3.5 text-[#A67C52] stroke-[1.75]" />
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Obras e Instrumentos de este Luthier en Sinfonía */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Catálogo de Autor
            </span>
            <h2 className="font-editorial text-2xl font-medium text-[#262422]">
              Piezas Disponibles en Taller
            </h2>
          </div>
          <span className="text-xs text-[#6E675F]">
            Instrumentos listos para probar con cita pericial
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </div>
      </div>
    </div>
  );
}
