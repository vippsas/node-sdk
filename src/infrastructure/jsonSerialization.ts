export const serialize = (data: any): string => JSON.stringify(data);
export const deserialize = <T>(json: string): T => {
  const parsed = JSON.parse(json) as T;
  if (!parsed) {
    throw new Error(`Could not deserialize to specified type`);
  }
  return parsed;
};
