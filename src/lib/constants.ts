import { InstrumentCategory, InstrumentCondition } from "@/types";

export interface CategoryOption {
  id: InstrumentCategory | "ALL";
  label: string;
  iconName: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryOption[] = [
  {
    id: "ALL",
    label: "Todos los instrumentos",
    iconName: "Compass",
    subcategories: ["Guitarras", "Bajos", "Vientos", "Percusión", "Teclados", "Accesorios"],
  },
  {
    id: "STRINGS",
    label: "Cuerdas",
    iconName: "Music2",
    subcategories: [
      "Guitarra Clásica",
      "Guitarra Eléctrica",
      "Guitarra Acústica",
      "Bajo Eléctrico",
      "Violín",
      "Cello",
      "Charango",
      "Ukelele",
    ],
  },
  {
    id: "WINDS",
    label: "Vientos",
    iconName: "Wind",
    subcategories: [
      "Saxofón Alto",
      "Saxofón Tenor",
      "Trompeta",
      "Clarinete",
      "Flauta Traversa",
      "Trombón",
      "Armónica",
    ],
  },
  {
    id: "PERCUSSION",
    label: "Percusión",
    iconName: "Drum",
    subcategories: [
      "Batería Acústica",
      "Batería Electrónica",
      "Cajón Peruano / Flamenco",
      "Congas / Bongós",
      "Platillos",
      "Accesorios de Percusión",
    ],
  },
  {
    id: "KEYBOARDS",
    label: "Teclados y Pianos",
    iconName: "Piano",
    subcategories: [
      "Piano Digital",
      "Sintetizador",
      "Teclado Controlador MIDI",
      "Acordeón",
      "Piano Vertical Acústico",
    ],
  },
  {
    id: "AUDIO_ACCESSORIES",
    label: "Accesorios y Audio",
    iconName: "Headphones",
    subcategories: [
      "Amplificadores",
      "Pedales de Efectos",
      "Fundas y Estuches Rígidos",
      "Micrófonos",
      "Soportes y Afinadores",
    ],
  },
];

export interface BudgetPreset {
  label: string;
  description: string;
  amountARS: number;
  amountUSD: number;
}

export const BUDGET_PRESETS: BudgetPreset[] = [
  {
    label: "Iniciación y Estudio",
    description: "Instrumentos funcionales y revisados para arrancar sin gastar de más",
    amountARS: 120000,
    amountUSD: 130,
  },
  {
    label: "Estudiante Avanzado",
    description: "Excelente relación precio/calidad para conservatorio y prácticas intensivas",
    amountARS: 380000,
    amountUSD: 400,
  },
  {
    label: "Semi-Profesional",
    description: "Instrumentos calibrados para escenario y sesiones de ensayo frecuentes",
    amountARS: 950000,
    amountUSD: 980,
  },
  {
    label: "Luthiers y Alta Gama",
    description: "Piezas artesanales de autor, maderas seleccionadas y sonido pericial de concierto",
    amountARS: 2400000,
    amountUSD: 2500,
  },
];

export const CONDITION_LABELS: Record<
  InstrumentCondition,
  { label: string; badgeClass: string; description: string }
> = {
  [InstrumentCondition.BRAND_NEW]: {
    label: "Nuevo en caja",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description: "Sin uso previo, con garantía oficial de fábrica.",
  },
  [InstrumentCondition.LUTHIER_CRAFT]: {
    label: "Pieza de Luthier",
    badgeClass: "bg-[#F7EFE6] text-[#A67C52] border-[#E2CFB8]",
    description: "Construcción artesanal de autor, maderas estacionadas y ajuste pericial.",
  },
  [InstrumentCondition.USED_EXCELLENT]: {
    label: "Usado Impecable",
    badgeClass: "bg-[#F3EFEA] text-[#262422] border-[#E6DFD5]",
    description: "Mínimas marcas de uso estético. 100% operativo sin necesidad de calibración.",
  },
  [InstrumentCondition.USED_FAIR]: {
    label: "Usado con Desgaste",
    badgeClass: "bg-stone-100 text-stone-700 border-stone-200",
    description: "Signos claros de uso que no alteran la acústica ni la integridad estructural.",
  },
  [InstrumentCondition.NEEDS_REPAIR]: {
    label: "Oportunidad / A Calibrar",
    badgeClass: "bg-amber-50 text-[#D97706] border-amber-200",
    description: "Precio rebajado. Requiere cambio de cuerdas, nivelación o ajuste menor.",
  },
};
