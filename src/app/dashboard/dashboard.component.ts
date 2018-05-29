import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MenuItem, TreeNode} from 'primeng/api';
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

  constructor(private router: Router, private auth: AuthService, private nodeService: NodeService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getITData();

    this.items = [
      {label: 'Add New', command: () => this.addNew(this.selectedFile)},
      {label: 'Vote', command: () => this.vote(this.selectedFile)}
    ];
  }

  reducePath = (nodes: TreeNode[], path: string) => {
    const split = path.split('|');

    if (split.length === 1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-file-o'
        }
      ];
    }

    if (nodes.findIndex(n => n.label === split[0]) === -1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-folder',
          children: this.reducePath([], split.slice(1).join('|'))
        }
      ];
    }

    return nodes.map(n => {
      if (n.label !== split[0]) {
        return n;
      }

      return Object.assign({}, n, {
        children: this.reducePath(n.children, split.slice(1).join('|'))
      });
    });
  }

  getITData() {
    this.nodeService.getITData().then(files => {
      this.files = files.reduce(this.reducePath, []);

    });
  }

  getTestData() {
    this.nodeService.getTestData().then(files => {
      this.files = [{
        label: 'Root',
        children: files
      }];
    });
  }

  addNew(file: TreeNode) {
    console.log(this.files);
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

  expandAll() {
    this.files.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.files.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
