import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import urljoin from 'url-join';
import { QueryObject, CustomOptions, Mock, FactoryOptions } from './types';

export class ApiFactory {
  public options: FactoryOptions;

  constructor(options: FactoryOptions) {
    this.options = options;
  }

  public createApiService = (path: string) => {
    const { apiUrl, ...restOptions } = this.options;

    return new ApiService(
      urljoin(apiUrl ? apiUrl : '', path),
      restOptions,
    );
  };
}

class ApiService {
  private readonly options: AxiosRequestConfig;
  private readonly url: string;
  private readonly customOptions: CustomOptions;

  constructor(url: string, options: AxiosRequestConfig, customOptions: CustomOptions = {}) {
    this.url = url;
    this.options = options;
    this.customOptions = customOptions;
  }

  public path = (url: string): ApiService => {
    return new ApiService(
      urljoin(this.url, url),
      this.options,
      this.customOptions,
    );
  };

  public addMock = (data: Mock): ApiService => {
    return new ApiService(
      this.url,
      this.options,
      {
        mock: data,
      },
    );
  };

  public get = <R>(queryObject?: QueryObject) => {
    const queryStr: string = this.parseQuery(queryObject);
    const config = {
      method: 'get',
      url: this.createUrlWithQueryStr(queryStr),
      ...this.options,
    };

    // @ts-ignore
    return this.createRequest<R>(config);
  };

  public post = <R>(data: R) => {
    const config = this.createConfig('post', data);

    // @ts-ignore
    return this.createRequest<R>(config);
  };

  public put = <R>(data: R) => {
    const config = this.createConfig('put', data);

    // @ts-ignore
    return this.createRequest<R>(config);
  };

  public patch = <R>(data: R) => {
    const config = this.createConfig('patch', data);

    // @ts-ignore
    return this.createRequest<R>(config);
  };

  public delete = <R>(queryObject: QueryObject) => {
    const queryStr = this.parseQuery(queryObject);
    const config = {
      method: 'delete',
      url: this.createUrlWithQueryStr(queryStr),
      ...this.options,
    };

    // @ts-ignore
    return this.createRequest<R>(config);
  };

  private createConfig = <R>(method: string, data: R) => ({
    method,
    data,
    url: this.url,
    ...this.options,
  });

  private createUrlWithQueryStr = (queryStr: string) => {
    return this.getUrl() + queryStr;
  };

  private getUrl = () => {
    return this.url;
  };

  private parseQuery = (queryObject: QueryObject | undefined): string => {
    if (!queryObject) return '';

    const keysQueryObject = Object.keys(queryObject) as string[];

    return keysQueryObject.reduce((acc, key, index) => {
      const value = queryObject[key];

      key = index === 0 
        ? key
        : `&${key}`;

      const valueStr = Array.isArray(value)
        ? `${key}=[${value.join(',')}]`
        : `${key}=${value}`;

      return acc + valueStr;
    }, '?');
  };

  private createRequest = <D>(config: AxiosRequestConfig) => {
    return axios(config)
      .then((res: AxiosResponse<D>) => res.data as D)
      .catch((ex) => {
        console.warn('---', 'API exception', ex.response);

        return Promise.reject(ex);
      });
  };
}
