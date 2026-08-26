import type { Currency } from '../types/crypto';

const CURRENCY_CONFIG: Record<Currency, { rate: number; symbol: string; decimals: number }> = {
  USD: { rate: 1.0, symbol: '$', decimals: 2 },
  EUR: { rate: 0.92, symbol: '€', decimals: 2 },
  GBP: { rate: 0.78, symbol: '£', decimals: 2 },
  JPY: { rate: 154.0, symbol: '¥', decimals: 0 },
  BTC: { rate: 1 / 78450, symbol: '₿', decimals: 4 },
};

export function formatCurrency(amountUsd: number, currency: Currency = 'USD'): string {
  if (amountUsd === undefined || amountUsd === null || isNaN(amountUsd)) return 'N/A';

  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const converted = amountUsd * config.rate;

  if (currency === 'BTC') {
    return `${config.symbol}${converted.toFixed(4)}`;
  }

  return `${config.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  })}`;
}

export function formatCompactCurrency(amountUsd: number, currency: Currency = 'USD'): string {
  if (amountUsd === undefined || amountUsd === null || isNaN(amountUsd)) return 'N/A';

  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const converted = amountUsd * config.rate;

  if (Math.abs(converted) >= 1e12) {
    return `${config.symbol}${(converted / 1e12).toFixed(2)}T`;
  }
  if (Math.abs(converted) >= 1e9) {
    return `${config.symbol}${(converted / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(converted) >= 1e6) {
    return `${config.symbol}${(converted / 1e6).toFixed(2)}M`;
  }

  return `${config.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  })}`;
}
