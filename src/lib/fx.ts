/**
 * Live FX via Frankfurter (https://www.frankfurter.dev/) — public JSON, browser-safe CORS.
 *
 * Google's legacy HTML endpoint `https://www.google.com/finance/converter?...` now returns 404,
 * so scraping it always fell back to mock rates (e.g. NT$401 for RM59 instead of ~NT$472).
 */

export type UnitsPerUsdRates = {
  MYR: number;
  TWD: number;
  SGD: number;
};

type FrankfurterV2Row = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

const FX_URL = 'https://api.frankfurter.dev/v2/rates?base=USD&quotes=MYR,TWD,SGD';

/** How many units of MYR / TWD / SGD equal 1 USD (for multiplying internal USD prices). */
export async function fetchUnitsPerUsd(): Promise<UnitsPerUsdRates> {
  const res = await fetch(FX_URL);
  if (!res.ok) {
    throw new Error(`FX fetch failed: ${res.status}`);
  }
  const rows = (await res.json()) as unknown;
  if (!Array.isArray(rows)) {
    throw new Error('FX response unexpected shape');
  }

  const out: Partial<UnitsPerUsdRates> = {};
  for (const row of rows as FrankfurterV2Row[]) {
    if (row?.quote !== 'MYR' && row?.quote !== 'TWD' && row?.quote !== 'SGD') continue;
    const r = Number(row.rate);
    if (!Number.isFinite(r) || r <= 0) continue;
    out[row.quote] = r;
  }

  if (out.MYR === undefined || out.TWD === undefined || out.SGD === undefined) {
    throw new Error('FX response missing required currencies');
  }

  return out as UnitsPerUsdRates;
}
