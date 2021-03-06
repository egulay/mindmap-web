import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TreeNode} from 'primeng/api';
import TreeObject = TestTree.TreeObject;
import {NewNode} from '../model/newNode';
import TreeNodes = TreeStructure.TreeNodes;


@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) {
  }

  getTestData() {
    return this.http.get<TreeObject>('http://localhost:4200/assets/testData.json')
      .toPromise()
      .then(res => <TreeNode[]> res.data);
  }

  getData(departmentId: string) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url: String = 'http://localhost:8080/api/tree/'.concat(departmentId);

    // return this.http.get<TreeObject>('http://localhost:8080/api/tree/5b0be222f3be1b388cdc8dfd', {headers: httpHeaders})
    //   .toPromise()
    //   .then(res => <TreeNode[]> res.data);

    return this.http.get<TreeNodes>(url.toString(), {headers: httpHeaders})
      .toPromise();
  }

  saveNode(node: NewNode) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url: String = 'http://localhost:8080/api/tree/add';
    return this.http.post<TreeNodes>(url.toString(), node, {headers: httpHeaders}).toPromise();
  }

  addVote(departmentId: string, labelName: string) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url: String = 'http://localhost:8080/api/tree/vote/'.concat(departmentId).concat('/').concat(labelName);

    return this.http.get<TreeNodes>(url.toString(), {headers: httpHeaders})
      .toPromise();
  }

  checkLabelIfExist(departmentId: string, labelName: string) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8'
      , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url: String = 'http://localhost:8080/api/tree/checkLabelExist/'.concat(departmentId).concat('/').concat(labelName);

    return this.http.get<boolean>(url.toString(), {headers: httpHeaders})
      .toPromise();
  }
}
