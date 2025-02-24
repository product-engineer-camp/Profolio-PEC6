type SnakeToCamelCase<T extends string> = T extends `${infer A}_${infer B}`
  ? `${A}${Capitalize<SnakeToCamelCase<B>>}`
  : T;

type SnakeToCamelCaseObject<T> = {
  [K in keyof T as K extends string
    ? SnakeToCamelCase<K>
    : K]: T[K] extends Record<string, any>
    ? SnakeToCamelCaseObject<T[K]>
    : T[K];
};

type CamelToSnakeCase<T extends string> = T extends `${infer A}${infer B}`
  ? B extends Capitalize<B>
    ? `${A}_${CamelToSnakeCase<B>}`
    : `${A}${CamelToSnakeCase<B>}`
  : T;

type CamelToSnakeCaseObject<T> = {
  [K in keyof T as K extends string
    ? CamelToSnakeCase<K>
    : K]: T[K] extends Record<string, any>
    ? CamelToSnakeCaseObject<T[K]>
    : T[K];
};

/**
 * 스네이크 케이스 객체를 카멜 케이스로 변환합니다.
 * @param data - 변환할 객체
 * @returns 카멜 케이스로 변환된 객체
 */

export function formatSnakeToCamel<T extends Record<string, any>>(
  data: T | null | undefined,
): SnakeToCamelCaseObject<T> {
  if (!data) {
    return {} as SnakeToCamelCaseObject<T>;
  }

  const formatted = {} as SnakeToCamelCaseObject<T>;

  Object.entries(data).forEach(([key, value]) => {
    if (key.includes("_")) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      formatted[camelKey as keyof typeof formatted] = value;
    } else {
      formatted[key as keyof typeof formatted] = value;
    }
  });

  return formatted;
}

/**
 * 카멜 케이스 객체를 스네이크 케이스로 변환합니다.
 * @param data - 변환할 객체
 * @returns 스네이크 케이스로 변환된 객체
 */
export function formatCamelToSnake<T extends Record<string, any>>(
  data: T | null | undefined,
): CamelToSnakeCaseObject<T> {
  if (!data) {
    return {} as CamelToSnakeCaseObject<T>;
  }

  const formatted = {} as CamelToSnakeCaseObject<T>;

  Object.entries(data).forEach(([key, value]) => {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    formatted[snakeKey as keyof typeof formatted] = value;
  });

  return formatted;
}
