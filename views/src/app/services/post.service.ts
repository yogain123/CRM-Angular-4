import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class PostService {

  constructor(public http : Http) { }
  getPost(url : string){
    return this.http.get(url)
    .map(response=>response.json());
  }

  deletePost(url : string){
    return this.http.delete(url);
  }
  createPost(url : string, obj : {}){
    return this.http.post(url, obj)
    .map(response=>response.json());
  }
}
