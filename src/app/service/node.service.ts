import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
