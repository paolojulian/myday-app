export function filtersToString(filters: Filter[]) {
  if (filters.length < 1) {
    return { whereString: '', values: [] };
  }

  let whereString = 'WHERE ';
  let values: string[] = [];
  filters.forEach(element => {
    whereString += element.columnName + ' ' + element.condition + '?';
    values.push(element.value);
  });

  return { whereString, values };
}
