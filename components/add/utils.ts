import { SupportedAddItems } from '@/app/add';

export function isSupportedAddType(defaultType?: string): defaultType is SupportedAddItems {
  if (!defaultType) {
    return false;
  }
  const supportedTypes: SupportedAddItems[] = ['Expense', 'Todo', 'Journal'];

  const isSupportedType = supportedTypes.includes(defaultType as SupportedAddItems);

  return isSupportedType;
}

export function getDefaultTypeFromTabIndex(index: number): SupportedAddItems | undefined {
  switch (index) {
    case 1:
      return 'Expense';
    case 2:
      return 'Todo';
    case 3:
      return 'Journal';
    default:
      return undefined;
  }
}
