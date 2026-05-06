import { MOCK_PRODUCTS } from './data';
import type { UnitsPerUsdRates } from './fx';

type ProductRow = (typeof MOCK_PRODUCTS)[number];

/** USD amount used with `formatPrice` (which multiplies by live `unitsPerUsd`). */
export function getCardPriceUsd(product: ProductRow, unitsPerUsd: UnitsPerUsdRates): number {
  if (product.id === '1') return 49 / unitsPerUsd.MYR;
  if (product.id === '4') return 60 / unitsPerUsd.MYR;
  if (product.id === '6') return 75 / unitsPerUsd.MYR;
  if (product.id === '10') return 10 / unitsPerUsd.MYR;
  if (product.id === '14') return 50 / unitsPerUsd.MYR;
  if (product.id === '20') return 10 / unitsPerUsd.MYR;
  if (product.id === '22') return 69.9 / unitsPerUsd.MYR;
  if (product.id === '23') return 55.9 / unitsPerUsd.MYR;
  if (product.id === '15') return 30 / unitsPerUsd.MYR;
  if (product.id === '18') return 55 / unitsPerUsd.MYR;
  if (product.id === '8' || product.id === '7' || product.id === '11' || product.id === '12' || product.id === '13' || product.id === '9') return 55 / unitsPerUsd.MYR;
  if (product.id === '3') return 23 / unitsPerUsd.MYR;
  if (product.id === '5') return 60 / unitsPerUsd.MYR;
  if ((product as { series?: { en: string } }).series?.en === 'Pingu' && product.id !== '22') return 59 / unitsPerUsd.MYR;
  return product.price;
}
