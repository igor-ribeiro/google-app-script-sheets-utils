export function getNamedRange(sheet: GSheet.Sheet, name: string): GSheet.Range {
  return sheet.getRange(name);
}
