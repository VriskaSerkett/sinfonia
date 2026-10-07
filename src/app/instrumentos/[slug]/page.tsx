import { notFound } from "next/navigation";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";
import ProductDetailView from "@/components/instruments/ProductDetailView";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return MOCK_INSTRUMENTS.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const instrument = MOCK_INSTRUMENTS.find((item) => item.slug === slug);

  if (!instrument) {
    notFound();
  }

  return <ProductDetailView instrument={instrument} />;
}
