export function checkPropertiesInObject(
  arrayProperties: string[],
  object: Record<string, string>,
): boolean {
  return arrayProperties.map(prop => !!object[prop]).every(value => value)
}
