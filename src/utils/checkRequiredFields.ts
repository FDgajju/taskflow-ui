export const checkRequiredFields = (
  data: Record<string, string | number>,
  fields: string[],
) => {
  const missingFields: string[] = [];
  for (const key of fields) {
    if (
      !(key in data) ||
      (typeof data[key] === 'string' && data[key].trim() === '') ||
      (typeof data[key] === 'number' && Number.isNaN(data[key]))
    ) {
      missingFields.push(key);
    }
  }
  if (missingFields.length === 0) return '';
  if (missingFields.length === 1) return missingFields[0];
  if (missingFields.length === 2)
    return `${missingFields[0]} and ${missingFields[1]}`;

  return (
    missingFields.slice(0, -1).join(', ') +
    ' and ' +
    missingFields[missingFields.length - 1]
  );
};
