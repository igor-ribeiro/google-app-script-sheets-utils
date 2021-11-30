export function rangeToJson<T extends string, Values = Record<T, any>>(
  range: GSheet.Range,
  headerToUse: T[] = []
): Values[] {
  const rangeValues = range.getValues();
  const json: Values[] = [];
  let header = headerToUse;

  for (let i = 0; i < rangeValues.length; i++) {
    const values: any[] = rangeValues[i];

    if (i === 0 && header.length === 0) {
      header = values as T[];

      continue;
    }

    json.push(
      values.reduce((item, value, index) => {
        item[header[index]] = value === '' ? null : value;

        return item;
      }, {} as Values)
    );
  }

  return json;
}
