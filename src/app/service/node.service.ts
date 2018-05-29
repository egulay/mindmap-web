import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TreeNode} from 'primeng/api';
import TreeObject = TestTree.TreeObject;

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) {}

  getTestData() {
    return this.http.get<TreeObject>('http://localhost:4200/assets/testData.json')
      .toPromise()
      .then(res => <TreeNode[]> res.data);
  }

  getITData() {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<TreeObject>('http://localhost:8080/api/node/getTree/5b0be222f3be1b388cdc8dfd', {headers: httpHeaders})
      .toPromise()
      .then(res => <TreeNode[]> res.data);
  }
}
