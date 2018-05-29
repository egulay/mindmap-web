import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MenuItem, TreeNode} from 'primeng/api';
import {NodeService} from '../service/node.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NewNode} from '../model/newNode';
import {AddNewNodeDialogComponent} from '../add-new-node-dialog/add-new-node-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;
  items: MenuItem[];

  newLabel: String;

  constructor(private router: Router
    , private auth: AuthService
    , private nodeService: NodeService
    , public snackBar: MatSnackBar
    , public dialog: MatDialog) {
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
          icon: 'fa-file-o',
          expanded: true,
        }
      ];
    }

    if (nodes.findIndex(n => n.label === split[0]) === -1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-folder',
          expanded: true,
          children: this.reducePath([], split.slice(1).join('|')),
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
  };

  getITData() {
    this.files = [];
    this.nodeService.getData('5b0be222f3be1b388cdc8dfd').then(files => {
      this.files = files.treeNodes.reduce(this.reducePath, []);
      this.setVoted(files.voteWinnerLabel);
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
    const dialogRef = this.dialog.open(AddNewNodeDialogComponent, {
      autoFocus: false,
      width: '20px',
      height: '20px',
      data: {label: this.newLabel}
    });

    dialogRef.afterClosed().subscribe(result => {
      const node: NewNode = {
        departmentId: '5b0be222f3be1b388cdc8dfd',
        label: result,
        parentLabel: file.label
      };

      this.nodeService.saveNode(node).then(() => this.getITData());

      this.snackBar.open('Saved: '.concat(node.label), 'Info', {
        duration: 2000,
        politeness: 'assertive'
      });
    });


  }

  vote(file: TreeNode) {
    this.snackBar.open('Voted: '.concat(file.label), 'Info', {
      duration: 2000,
      politeness: 'assertive'
    });
  }

  setVoted(label: String) {
    this.files.forEach(node => {
      this.setVotedRecursive(node, label);
    });
  }

  setVotedRecursive(node: TreeNode, label: String) {
    if (node.label === label) {
      node.styleClass = 'voted-font-magenta';
    }
    if (node.children) {
      node.children.forEach(childNode => {
        childNode.styleClass = 'node-font-black';
        this.setVotedRecursive(childNode, label);
      });
    }
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
