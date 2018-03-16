import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  mem : any = {};

  constructor() {
  }

  public getScope(key: string) {
    return this.mem[key];
  }

  public setScope(key: string, value: any) {
    this.mem[key] = value;
    console.log(this.mem);
  }
}
