export function addVariableIfDefined<T>(
  variables: Record<string, T>,
  fieldName: string,
  value?: T,
) {
  if (!value) return;

  variables[`$${fieldName}`] = value;
}
