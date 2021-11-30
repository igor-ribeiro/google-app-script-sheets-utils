export function getNamedRange(sheet: GSheet.Sheet, name: string) {
  return sheet.getRange(name).getValue();
}
