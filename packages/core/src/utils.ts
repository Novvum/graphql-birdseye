export function setTimeoutAsync(...args: Array<any>) {
  const [callback, ...rest] = args;
  return new Promise(resolve =>
    setTimeout(() => {
      callback();
      resolve();
    }, ...rest)
  );
}

export function mapToArray<T>(map: { [key: string]: T }): Array<T> {
  return Object.keys(map).map(k => map[k]);
}
export function arrayToMap<T>(arr: ReadonlyArray<T>, getKey: (item: T) => string): { [key: string]: T } {
  return arr.reduce((acc, item) => {
    acc[getKey(item)] = item;
    return acc;
  }, {} as { [key: string]: T });
}