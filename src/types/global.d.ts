declare type Recordable<T = any> = Record<string, T>

declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
