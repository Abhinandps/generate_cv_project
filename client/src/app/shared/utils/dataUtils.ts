export function trimColonFromProperties(data: Record<string, any>): Record<string, any> {
  const trimmedData: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] === 'string') {
        trimmedData[key] = data[key].replace(': ', '');
      } else {
        trimmedData[key] = data[key];
      }
    }
  }
  return trimmedData;
}
