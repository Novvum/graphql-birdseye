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