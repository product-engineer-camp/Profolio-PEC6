type Sortable = {
  [key: string]: any;
};

type SortIteratee<T> = keyof T | ((obj: T) => any);

type SortDirection = "asc" | "desc";

export const sortBy = <T extends Sortable>(
  collection: T[],
  iteratees: SortIteratee<T> | SortIteratee<T>[],
  direction: SortDirection = "asc",
): T[] => {
  const normalizedIteratees = Array.isArray(iteratees)
    ? iteratees
    : [iteratees];

  return [...collection].sort((a, b) => {
    for (const iteratee of normalizedIteratees) {
      const getValue = (obj: T) => {
        if (typeof iteratee === "function") {
          return iteratee(obj);
        }
        const value: unknown = obj[iteratee];
        return value instanceof Date ? value.getTime() : value;
      };

      const aVal = getValue(a);
      const bVal = getValue(b);

      if (aVal === bVal) continue;

      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      const compareResult = aVal < bVal ? -1 : 1;
      return direction === "asc" ? compareResult : -compareResult;
    }
    return 0;
  });
};
