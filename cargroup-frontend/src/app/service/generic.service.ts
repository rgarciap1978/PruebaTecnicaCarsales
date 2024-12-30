import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    @Inject("url") protected url: string
  ) {}

  findAll() {
    return this.http.get(this.url);
  }

  findById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  findByMultipleId(ids: string) {
    return this.http.get(`${this.url}/multiple?ids=${ids}`);
  }
}
