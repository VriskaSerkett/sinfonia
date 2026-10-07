// Tipos basados en el modelo de dominio de Sinfonía (context.md)

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  LUTHIER = 'LUTHIER',
  ADMIN = 'ADMIN',
}

export enum InstrumentCondition {
  BRAND_NEW = 'BRAND_NEW',
  LUTHIER_CRAFT = 'LUTHIER_CRAFT',
  USED_EXCELLENT = 'USED_EXCELLENT',
  USED_FAIR = 'USED_FAIR',
  NEEDS_REPAIR = 'NEEDS_REPAIR',
}

export type InstrumentCategory =
  | 'STRINGS'
  | 'WINDS'
  | 'PERCUSSION'
  | 'KEYBOARDS'
  | 'AUDIO_ACCESSORIES';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAgeVerified: boolean;
  isIdentityVerified: boolean;
  avatarUrl?: string;
  luthierShopName?: string;
  createdAt: Date | string;
}

export interface InstrumentImage {
  url: string;
  isCover: boolean;
  isVerificationPass: boolean;
  caption?: string;
}

export interface Instrument {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: 'ARS' | 'USD';
  category: InstrumentCategory;
  subCategory: string;
  condition: InstrumentCondition;
  
  // Transparencia técnica obligatoria
  tonewoods?: string[];
  electronics?: string;
  stringsCondition: 'NEW' | 'USED' | 'MISSING_SOME' | 'NEEDS_REPLACEMENT';
  flawsDescription?: string; // Defectos cosméticos o reparaciones pendientes detalladas
  includedAccessories: string[];
  
  // Moderación y metadata
  images: InstrumentImage[];
  isPublished: boolean;
  isReported: boolean;
  sellerId: string;
  sellerName: string;
  sellerType: 'PARTICULAR' | 'LUTHIER_AUTHOR';
  location: string;
  createdAt: string;
}

export interface BudgetSearchParams {
  query?: string;
  category?: InstrumentCategory | 'ALL';
  maxBudget?: number;
  currency?: 'ARS' | 'USD';
  condition?: InstrumentCondition | 'ALL';
  onlyLuthier?: boolean;
}
