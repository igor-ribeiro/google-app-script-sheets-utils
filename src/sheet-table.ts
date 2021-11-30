export class SheetTable<T extends string, Values = Record<T, any>> {
  protected sheet: GSheet.Sheet;
  protected range: GSheet.Range;
  public fields: T[];

  constructor({
    sheet,
    range,
    fields,
  }: {
    sheet: string;
    range: string;
    fields: T[];
  }) {
    this.sheet = getSheetByNameOrFail(sheet);
    this.range = this.sheet.getRange(range);
    this.fields = fields;
  }

  values(): Values[] {
    return rangeToJson(this.getRange(), this.fields);
  }

  insert(data: Values[]) {
    const emptyRow = this.firstEmptyRow();

    if (emptyRow < 0) {
      throw new Error(`No rows left`);
    }

    const values = jsonToSheets(data, {
      ignoreHeader: true,
    });

    this.sheet
      .getRange(
        emptyRow,
        this.range.getColumn(),
        values.length,
        this.range.getNumColumns()
      )
      .setValues(values);
  }

  firstEmptyRow(): number {
    const values = this.range.getValues();

    for (let row = 0; row < values.length; row++) {
      if (Boolean(values[row].join("")) === false) {
        return row + this.range.getRow();
      }
    }

    return -1;
  }

  getRange() {
    console.log({
      row: this.range.getRow(),
      total: this.firstEmptyRow() - this.range.getRow() || 1,
    });

    return this.sheet.getRange(
      this.range.getRow(),
      this.range.getColumn(),
      this.firstEmptyRow() - this.range.getRow() || 1,
      this.range.getNumColumns()
    );
  }

  clear() {
    this.range.clearContent();
  }
}
