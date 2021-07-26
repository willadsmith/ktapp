import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

// const headerDict = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType?: 'json';
  method: string;
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class BackendService {

  private api = environment.apiUrl;

  public constructor(public http: HttpClient) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(options?: IRequestOptions): Observable<T> {
    // options.headers.append("Authorization", `Baerer ${localStorage.getItem('accessToken')}`)
    // options.headers = new HttpHeaders({
    //   'Authorization': `Baerer ${localStorage.getItem('accessToken')}`
    // });
    return this.http.get<T>(this.api, options);
  }


   /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
    public get2<T>(options?: IRequestOptions): Observable<T> {
      const httpHeaders = new HttpHeaders()
      httpHeaders.append('content-type', 'application/json')
      httpHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
      // options.headers.append("Authorization", `Baerer ${localStorage.getItem('accessToken')}`)
      // options.headers = new HttpHeaders({
      //   'Authorization': `Baerer ${localStorage.getItem('accessToken')}`
      // });
      return this.http.get<T>(this.api + '/documents', options);
    }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(params: Object, options?: IRequestOptions): Observable<T> {
    if (options === undefined) {
      options = <IRequestOptions>{};
    }
    options.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, (params[key] === undefined ? '' : params[key]));
    });
    return this.http.post<T>(this.api, httpParams, options);
  }

  public post2<T>(params: Object): Observable<T> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<T>(this.api, params, {headers: headers});
  }

  /**
   * POST request for forms for content type multipart/form-data
   * @param {object} endPoint end point of the api
   * @returns {Observable<T>}
   */
  public sendPostForm<T>(params: Object): Observable<T> {

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<T>(this.api, params, {headers: headers});
  }
}
