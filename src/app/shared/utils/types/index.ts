export type Constructor<T> = new (...args: any[]) => T

export type Callable<T> = (...args: any[]) => T

export type Nullable<T> = T | undefined | null
