# CONTEXT.MD — Plataforma Marketplace de Instrumentos Musicales Basada en Presupuesto

## 1. Visión y Propósito del Proyecto
Plataforma web tipo marketplace orientada a democratizar el acceso a la música resolviendo el principal cuello de botella: **encontrar un buen instrumento que se ajuste al presupuesto real del comprador**, con total transparencia técnica sobre su estado.

El marketplace une tres puntas:
1. **Compradores con presupuesto definido:** Músicos principiantes, estudiantes o profesionales que buscan maximizar la calidad de su compra sin pagar de más.
2. **Vendedores particulares:** Personas que tienen instrumentos en desuso y quieren venderlos de forma segura.
3. **Luthiers y artesanos:** Creadores que fabrican instrumentos de autor y necesitan visibilidad directa sin intermediarios abusivos.

El pilar ético de la plataforma es la **honestidad técnica radical**: cada publicación debe declarar con exactitud el estado del instrumento, desgastes, calibración requerida, defectos que no afecten el sonido y accesorios incluidos.

---

## 2. Directiva de Diseño: "Anti-AI Aesthetic" (Identidad Visual Orgánica)
> **REGLA CRÍTICA:** Queda estrictamente prohibido el diseño genérico de IA (fondos oscuros con gradientes púrpuras/cian, glassmorphism con desenfoques excesivos, fuentes ultra-geométricas sin alma, botones flotantes con sombras de neón y espacios vacíos gigantescos).

### Paleta de Colores (Cálida, Clara y Táctil)
Inspirada en talleres de luthería, papel artesanal y maderas nobles. Colores claros, suaves y no saturados:
- **Fondo Principal (Lienzo):** `#FAF8F5` (Blanco hueso / Papel cálido).
- **Fondo Secundario (Superficies/Cards):** `#F3EFEA` o `#FFFFFF` con borde suave.
- **Bordes y Separadores:** `#E6DFD5` (Tono arcilla/arena claro, 1px de grosor definido).
- **Texto Principal:** `#262422` (Carbón cálido, nunca `#000000` puro).
- **Texto Secundario:** `#6E675F` (Tono madera grisáceo).
- **Acento / Énfasis:** `#C25E38` (Terracota / Cuero envejecido suave) o `#A67C52` (Roble dorado suave) para llamadas a la acción clave.
- **Alertas / Estados de advertencia:** `#D97706` (Ámbar cálido para detalles a reparar).

### Tipografía y Composición
- **Títulos / Identidad:** Tipografía con carácter editorial o humana (ej. `Newsreader`, `Playfair Display`, `Fraunces` o una sans humanista como `Plus Jakarta Sans` o `Cabinet Grotesk`).
- **Cuerpo y Datos Técnicos:** Tipografía neutra y legible (`Geist`, `Inter` ajustada o `Space Grotesk` para números y precios).
- **Tratamiento de UI:** Tarjetas con bordes sólidos y nítidos (`border border-stone-200/80`), esquinas redondeadas naturales (`rounded-lg` o `rounded-md`, evitar `rounded-3xl` exagerado), microinteracciones discretas sin saltos bruscos.

---

## 3. Stack Tecnológico
- **Framework:** Next.js (App Router, Server Components y Server Actions).
- **Lenguaje:** TypeScript (tipado estricto, sin `any`).
- **Estilos:** Tailwind CSS con variables semánticas.
- **Componentes Base:** Radix UI / shadcn/ui (personalizados bajo la paleta cálida).
- **Iconografía:** Lucide React exclusivamente (trazo fino, 1.5px - 1.75px, estética técnica y artesanal).
- **Base de Datos / Backend:** PostgreSQL con Prisma o Drizzle ORM (o Supabase).
- **Subida de Archivos:** Bucket de almacenamiento S3-compatible / Cloudinary con pre-validación de imagen.

---

## 4. Roles, Permisos y Flujos de Usuario

| Rol | Navegación | Búsqueda por Presupuesto | Comprar / Carrito | Publicar | Panel Venta |
|---|---|---|---|---|---|
| **Invitado (No registrado)** | Total | Sí (modo prueba) | Bloqueado (pide login) | Bloqueado | No |
| **Comprador** | Total | Sí | Sí (reserva + chat) | Bloqueado (requiere upgrade) | No |
| **Vendedor Particular** | Total | Sí | Sí | Sí (máx. límite usado) | Métricas y chat |
| **Luthier Verificado** | Total | Sí | Sí | Sí (etiqueta de autor) | Catálogo y taller |

---

## 5. Arquitectura de Pantallas y Experiencia de Usuario

### 5.1. Landing Page (Página Principal)
1. **Header Limpio:** Logo, enlace a "Historia y Filosofía", selector de modo (Explorar / Vender) y botón de Acceso.
2. **Hero con Propósito Claro:** Breve manifiesto: *"Encontrá el instrumento exacto para tu oído y tu bolsillo, o dale nueva vida al que ya no tocás"*.
3. **Buscador de Presupuesto Real (Componente Central):**
   - Campo 1: Tipo de instrumento (ej. Guitarra criolla, Saxo alto, Batería).
   - Campo 2: Presupuesto máximo del usuario (Slider o input numérico intuitivo).
   - Botón: "Buscar opciones a mi alcance".
4. **Navegación por Familias (Grid Táctil):**
   - Cuerdas (Frotadas, Pulsadas).
   - Viento (Maderas, Metales).
   - Percusión (Acústica, Latina, Orquestal).
   - Teclados y Pianos.
   - Accesorios y Audio.
5. **Sección "Oportunidades y Destacados":**
   - Instrumentos a precios accesibles recomendados por relación precio/calidad.
   - Creaciones destacadas de Luthiers.
6. **Sección Editorial ("Sobre Nosotros"):**
   - Historia de la plataforma, el problema que resuelve la búsqueda por presupuesto y el respaldo al trabajo artesanal.

### 5.2. Ficha de Producto: "Transparencia de Estado" (Diferencial Clave)
Cada ficha de instrumento se estructura como un reporte pericial honesto:
- **Galería de fotos de alta definición:** Obligatoriedad de fotos en plano general y fotos en primer plano de cualquier detalle o marca.
- **Badge de Origen:** `Usado Particular` vs `Pieza de Luthier` vs `Nuevo`.
- **Ficha Técnica Estructurada:**
  - Madera / Materiales de construcción.
  - Estado funcional: (100% operativo / necesita calibración / faltan cuerdas).
  - Componentes electrónicos: Pastillas, afinador integrado, preamplificador.
  - **Bloque de "Detalles a tener en cuenta":** Lista obligatoria de defectos estéticos o mecánicos menores (ej. *"Raya superficial en el barniz de la tapa trasera, no afecta resonancia"*, *"Traste 12 requiere nivelación"*).
  - Accesorios incluidos: Funda, soporte, afinador, cable, etc.
- **Botón "Comprar / Reservar":**
  - Añade al carrito y abre un canal directo de chat privado entre comprador y vendedor para acordar método de pago y entrega.

### 5.3. Flujo de Publicación (Vendedores y Luthiers)
1. **Paso 1: Selección de Familia y Categoría** (Vientos -> Saxofón -> Alto).
2. **Paso 2: Botón (+) de Nueva Publicación**.
3. **Paso 3: Carga y Validación de Fotos:**
   - Filtro de seguridad (IA/Computer Vision o pre-moderación) para validar que la imagen corresponde a un instrumento musical y no a contenido inapropiado o imágenes falsas de stock.
4. **Paso 4: Declaración de Estado:**
   - Formulario guiado paso a paso con preguntas obligatorias sobre el estado físico, accesorios y defectos.
5. **Paso 5: Precio y Presupuesto Sugerido:**
   - Establecer precio fijo o abierto a ofertas razonables dentro del presupuesto del comprador.

---

## 6. Seguridad, Confianza y Moderación
1. **Restricción de Edad:** Los vendedores deben certificar ser mayores de 18 años mediante declaración jurada y validación de identidad básica (DNI/Teléfono).
2. **Pre-validación de Imágenes:** Análisis automático en la subida para bloquear spam, armas, drogas o contenido ajeno al rubro musical.
3. **Sistema Comunitario de Reportes:**
   - Botón visible en cada publicación: *"Reportar artículo ilegal, falso o no musical"*.
   - Si un artículo acumula reportes, se despublica temporalmente a cola de revisión y se suspende al usuario si es reincidente.
4. **Acuerdo de Pago Protegido:**
   - El chat cuenta con avisos de seguridad que aconsejan probar el instrumento en lugares públicos o acordar transferencias seguras tras constatar el estado.

---

## 7. Modelo de Datos Tentativo (Prisma / TypeScript Schema)

```typescript
// Roles y Estados
enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  LUTHIER = 'LUTHIER',
  ADMIN = 'ADMIN'
}

enum InstrumentCondition {
  BRAND_NEW = 'BRAND_NEW',
  LUTHIER_CRAFT = 'LUTHIER_CRAFT',
  USED_EXCELLENT = 'USED_EXCELLENT',
  USED_FAIR = 'USED_FAIR',
  NEEDS_REPAIR = 'NEEDS_REPAIR'
}

// Modelos principales
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAgeVerified: boolean; // Mayor de 18
  isIdentityVerified: boolean;
  avatarUrl?: string;
  createdAt: Date;
}

interface Instrument {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string; // ej. ARS, USD
  category: 'STRINGS' | 'WINDS' | 'PERCUSSION' | 'KEYBOARDS' | 'AUDIO_ACCESSORIES';
  subCategory: string; // ej. "Guitarra Clásica", "Bajo 4 cuerdas"
  condition: InstrumentCondition;
  
  // Transparencia técnica obligatoria
  tonewoods?: string[];
  electronics?: string;
  stringsCondition: 'NEW' | 'USED' | 'MISSING_SOME' | 'NEEDS_REPLACEMENT';
  flawsDescription?: string; // Defectos cosméticos o reparaciones pendientes
  includedAccessories: string[]; // ['Funda acolchada', 'Afinador clip']
  
  // Moderación e imágenes
  images: { url: string; isCover: boolean; isVerificationPass: boolean }[];
  isPublished: boolean;
  isReported: boolean;
  sellerId: string;
}

interface OrderConversation {
  id: string;
  instrumentId: string;
  buyerId: string;
  sellerId: string;
  status: 'PENDING_AGREEMENT' | 'RESERVED' | 'COMPLETED' | 'CANCELLED';
  messages: { senderId: string; text: string; sentAt: Date }[];
}