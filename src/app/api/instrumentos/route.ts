import { NextResponse } from "next/server";
import { MOCK_INSTRUMENTS } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");
  const maxBudget = searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : undefined;
  const currency = searchParams.get("currency") || "ARS";
  const condition = searchParams.get("condition");
  const luthierOnly = searchParams.get("luthier") === "true";

  let results = [...MOCK_INSTRUMENTS];

  if (category && category !== "ALL") {
    results = results.filter((item) => item.category === category);
  }

  if (maxBudget !== undefined) {
    results = results.filter(
      (item) => item.currency === currency && item.price <= maxBudget
    );
  }

  if (condition && condition !== "ALL") {
    results = results.filter((item) => item.condition === condition);
  }

  if (luthierOnly) {
    results = results.filter((item) => item.sellerType === "LUTHIER_AUTHOR");
  }

  if (query) {
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    total: results.length,
    currency,
    maxBudget,
    data: results,
  });
}
