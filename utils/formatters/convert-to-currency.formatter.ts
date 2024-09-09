import { toLocaleCurrencyFormat } from '../currency/currency.utils';

export function convertToCurrencyFormatter<T extends string | number>(
  value: T,
): string | undefined {
  console.log({ value });
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'number') {
    return toLocaleCurrencyFormat(value);
  }

  const cleanedValue = currencyCleaner(value);
  if (!cleanedValue) {
    return undefined;
  }

  return toLocaleCurrencyFormat(cleanedValue);
}

export function currencyCleaner(value: string) {
  const cleanedValue = value.replace(/[^0-9.-]+/g, '');

  return parseInt(cleanedValue) ?? undefined;
}
