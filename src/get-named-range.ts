export function getNamedRange(sheet: GSheet.Sheet, name: string): any {
  return sheet.getRange(name).getValue();
}
