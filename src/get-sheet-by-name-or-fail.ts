export function getSheetByNameOrFail(name: string): GSheet.Sheet {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);

  if (sheet == null) {
    throw new Error(`Sheet "${name}" not found`);
  }

  return sheet;
}
