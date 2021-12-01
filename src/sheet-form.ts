import { getSheetByNameOrFail } from './get-sheet-by-name-or-fail';

export class SheetForm<T extends string, Values = Record<T, any>> {
  protected sheet: GSheet.Sheet;
  protected range: GSheet.Range;
  protected fields: ReadonlyArray<T> = [];
  protected direction: 'vertical' | 'horizontal';

  constructor({
    sheet,
    range,
    fields,
  }: {
    sheet: string;
    range: string;
    fields: ReadonlyArray<T>;
  }) {
    this.sheet = getSheetByNameOrFail(sheet);
    this.range = this.sheet.getRange(range);
    this.fields = fields;

    const rows = this.range.getNumRows();
    const columns = this.range.getNumColumns();

    this.direction = rows > columns ? 'vertical' : 'horizontal';
  }

  values(): Values {
    const values: Record<any, any> = {};
    const formValues = this.range.getValues();

    for (let i = 0; i < this.fields.length; i++) {
      values[this.fields[i]] = formValues[i][0];
    }

    return values as Values;
  }

  reset() {
    this.range.clearContent();
  }

  empty() {
    return Boolean(this.range.getValues().join('')) === false;
  }

  set(field: T, value: any) {
    const index =
      this.fields.indexOf(field) +
      (this.direction === 'vertical'
        ? this.range.getRow()
        : this.range.getColumn());

    const rangeValue =
      this.direction === 'vertical'
        ? [index, this.range.getColumn()]
        : [this.range.getRow(), index];

    // @ts-ignore
    const range = this.sheet.getRange(...rangeValue);

    range.setValue(value);
    this.sheet.autoResizeColumn(range.getColumn());
  }
}
