import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MenuItem, Message, TreeNode} from 'primeng/api';
import {NodeService} from '../service/node.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;
  items: MenuItem[];
  msgs: Message[];

  constructor(private router: Router, private auth: AuthService, private nodeService: NodeService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.nodeService.getTestData().then(files => {
      this.files = [{
        label: 'Root',
        children: files
      }];
    });

    this.items = [
      {label: 'Add New', command: () => this.addNew(this.selectedFile)},
      {label: 'Vote', command: () => this.vote(this.selectedFile)}
    ];
  }

  addNew(file: TreeNode) {
    this.snackBar.open('Add dialog will be here..', 'Info', {
      duration: 2000,
      politeness: 'assertive'
    });
  }

  vote(file: TreeNode) {
    this.snackBar.open('Voted: '.concat(file.label), 'Info', {
      duration: 2000,
      politeness: 'assertive'
    });
  }


}
