export const getRandom = <T>(arr: Array<T>, n: number): Array<T> => {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);

  if (n > len) throw new RangeError("getRandom: more elements taken than available");

  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
};
