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
          expanded: false,

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
  }

  getITData() {
    this.files = [];
    this.nodeService.getData('5b0be222f3be1b388cdc8dfd').then(files => {
      this.files = files.treeNodes.reduce(this.reducePath, []);
      this.setVoted('Culture of Innovation', files);
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
    const deptId = '5b0be222f3be1b388cdc8dfd';

    const dialogRef = this.dialog.open(AddNewNodeDialogComponent, {
      autoFocus: false,
      width: '600px',
      height: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined') {
        const node: NewNode = {
          departmentId: deptId,
          label: result,
          parentLabel: file.label
        };

        this.nodeService.saveNode(node).then(files => {
          this.files = [];
          this.files = files.treeNodes.reduce(this.reducePath, []);
          this.setVoted('Culture of Innovation', files);

          this.snackBar.open('Saved: '.concat(node.label), 'Info', {duration: 2000, politeness: 'assertive'});
        });
      }
    });
  }

  vote(file: TreeNode) {
    this.nodeService.addVote('5b0be222f3be1b388cdc8dfd', file.label).then(files => {
      this.files = [];
      this.files = files.treeNodes.reduce(this.reducePath, []);

      // this.files.forEach(node => {
      //   this.resetAllStylesRecursive(node);
      // });

      this.setVoted('Culture of Innovation', files);
      this.snackBar.open('Voted: '.concat(file.label), 'Info', {
        duration: 2000,
        politeness: 'assertive'
      });
    });
  }

  setVoted(label: String, tree: TreeStructure.TreeNodes) {
    this.files.forEach(node => {
      if (tree.winners.allWinners.includes(node.label)) {
        if (tree.winners.winnersLvlOne.includes(node.label)) {this.setVotedRecursive2(node, tree, 'most-voted-font-magenta'); }
        if (tree.winners.winnersLvlTwo.includes(node.label)) {this.setVotedRecursive2(node, tree, 'second-voted-font-magenta'); }
        if (tree.winners.winnersLvlThree.includes(node.label)) {this.setVotedRecursive2(node, tree, 'third-voted-font-magenta'); }
        if (tree.winners.winnersLvlFour.includes(node.label)) {this.setVotedRecursive2(node, tree, 'fourth-voted-font-magenta'); }
        if (tree.winners.winnersLvlFive.includes(node.label)) {this.setVotedRecursive2(node, tree, 'fifth-voted-font-magenta'); }
      }
    });
  }

  resetAllStylesRecursive(node) {
    node.styleClass = 'node-font-black';
    if (node.children) {
      this.resetAllStylesRecursive(node);
    }
  }

  setVotedRecursive2(node: TreeNode, tree: TreeStructure.TreeNodes, style: string) {
    node.styleClass = style;
    if (node.children) {
      node.children.forEach(childNode => {
        childNode.styleClass = 'node-font-black';
      });
    }
  }

  setVotedRecursive(node: TreeNode, tree: TreeStructure.TreeNodes) {
    if (tree.winners.winnersLvlOne !== null) {
      if (tree.winners.winnersLvlOne.includes(node.label)) {
        node.styleClass = 'most-voted-font-magenta';
        if (node.children) {
          node.children.forEach(childNode => {
            childNode.styleClass = 'node-font-black';
          });
        }
      }
    }

    if (tree.winners.winnersLvlTwo !== null) {
      if (tree.winners.winnersLvlTwo.includes(node.label)) {
        node.styleClass = 'second-voted-font-magenta';
        if (node.children) {
          node.children.forEach(childNode => {
            childNode.styleClass = 'node-font-black';
          });
        }
      }
    }

    if (tree.winners.winnersLvlThree !== null) {
      if (tree.winners.winnersLvlThree.includes(node.label)) {
        node.styleClass = 'third-voted-font-magenta';
        if (node.children) {
          node.children.forEach(childNode => {
            childNode.styleClass = 'node-font-black';
          });
        }
      }
    }

    if (tree.winners.winnersLvlFour !== null) {
      if (tree.winners.winnersLvlFour.includes(node.label)) {
        node.styleClass = 'forth-voted-font-magenta';
        if (node.children) {
          node.children.forEach(childNode => {
            childNode.styleClass = 'node-font-black';
          });
        }
      }
    }

    if (tree.winners.winnersLvlFive !== null) {
      if (tree.winners.winnersLvlFive.includes(node.label)) {
        node.styleClass = 'fifth-voted-font-magenta';
        if (node.children) {
          node.children.forEach(childNode => {
            childNode.styleClass = 'node-font-black';
          });
        }
      }
    }

    if (node.children) {
      node.children.forEach(childNode => {
        this.setVotedRecursive(childNode, tree);
      });
    }
  }
}
