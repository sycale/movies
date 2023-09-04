export type CustomAny = any;

export type AnyObject = { [key: string]: CustomAny };

export type Nullable<T> = T | null | undefined;

export type Empty<T> = T | Record<string, never>;
