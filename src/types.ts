interface JSONResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type { JSONResponse };
