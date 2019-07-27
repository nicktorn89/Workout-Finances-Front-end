export interface QueryObject {
  [name: string]: string | number | string[] | number[] | '';
}

export type Data = { [key: string]: unknown };

export interface FactoryOptions {
  apiUrl: string;
  hostUrl: string;
  withCredentials?: boolean;
}

export interface CustomOptions {
  mock?: Mock;
}

export interface Mock { [key: number]: string; }
