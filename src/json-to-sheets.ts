export function jsonToSheets(
  json: Record<any, any>[],
  {
    ignoreHeader = false,
  }: {
    ignoreHeader?: boolean;
  }
): any[] {
  if (json == null || json.length === 0) {
    return [];
  }

  const sheets: any[] = [];

  if (ignoreHeader === false) {
    sheets.push(Object.keys(json[0]));
  }

  for (const item of json) {
    sheets.push(Object.values(item));
  }

  return sheets;
}
