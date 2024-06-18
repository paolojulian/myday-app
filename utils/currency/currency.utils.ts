import { getLocales } from 'expo-localization';

export function toLocaleCurrencyFormat(amount: number): string {
  const locale = getLocales();
  const defaultLocale = { languageTag: 'en-US', currencyCode: 'USD' };
  const resolvedLocale = locale[0] ?? defaultLocale;

  return Intl.NumberFormat(resolvedLocale.languageTag, {
    style: 'currency',
    currency: resolvedLocale.currencyCode ?? defaultLocale.currencyCode,
  }).format(amount);
}
