import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MenuItem, TreeNode} from 'primeng/api';
import {NodeService} from '../service/node.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NewNode} from '../model/newNode';
import {AddNewNodeDialogComponent} from '../add-new-node-dialog/add-new-node-dialog.component';
import {Popularity} from '../model/popularity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;
  items: MenuItem[];

  popularItems: Popularity[];

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
      this.setVoted(files.rootLabel, files);

      this.popularItems = [
        {position: 1, items: files.winners.winnersLvlOne !== null ? files.winners.winnersLvlOne.toString().split(',').join(', ') : ''},
        {position: 2, items: files.winners.winnersLvlTwo !== null ? files.winners.winnersLvlTwo.toString().split(',').join(', ') : ''},
        {position: 3, items: files.winners.winnersLvlThree !== null ? files.winners.winnersLvlThree.toString().split(',').join(', ') : ''},
        {position: 4, items: files.winners.winnersLvlFour !== null ? files.winners.winnersLvlFour.toString().split(',').join(', ') : ''},
        {position: 5, items: files.winners.winnersLvlFive !== null ? files.winners.winnersLvlFive.toString().split(',').join(', ') : ''}
      ];

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
          this.setVoted(files.rootLabel, files);

          this.popularItems = [
            {position: 1, items: files.winners.winnersLvlOne !== null
                ? files.winners.winnersLvlOne.toString().split(',').join(', ') : ''},
            {position: 2, items: files.winners.winnersLvlTwo !== null
                ? files.winners.winnersLvlTwo.toString().split(',').join(', ') : ''},
            {position: 3, items: files.winners.winnersLvlThree !== null
                ? files.winners.winnersLvlThree.toString().split(',').join(', ') : ''},
            {position: 4, items: files.winners.winnersLvlFour !== null
                ? files.winners.winnersLvlFour.toString().split(',').join(', ') : ''},
            {position: 5, items: files.winners.winnersLvlFive !== null
                ? files.winners.winnersLvlFive.toString().split(',').join(', ') : ''}
          ];

          this.snackBar.open('Saved: '.concat(node.label), 'Info', {duration: 2000, politeness: 'assertive'});
        });
      }
    });
  }

  vote(file: TreeNode) {
    this.nodeService.addVote('5b0be222f3be1b388cdc8dfd', file.label).then(files => {
      this.files = [];
      this.files = files.treeNodes.reduce(this.reducePath, []);

      this.popularItems = [
        {position: 1, items: files.winners.winnersLvlOne !== null ? files.winners.winnersLvlOne.toString().split(',').join(', ') : ''},
        {position: 2, items: files.winners.winnersLvlTwo !== null ? files.winners.winnersLvlTwo.toString().split(',').join(', ') : ''},
        {position: 3, items: files.winners.winnersLvlThree !== null ? files.winners.winnersLvlThree.toString().split(',').join(', ') : ''},
        {position: 4, items: files.winners.winnersLvlFour !== null ? files.winners.winnersLvlFour.toString().split(',').join(', ') : ''},
        {position: 5, items: files.winners.winnersLvlFive !== null ? files.winners.winnersLvlFive.toString().split(',').join(', ') : ''}
      ];

      this.setVoted(files.rootLabel, files);
      this.snackBar.open('Voted: '.concat(file.label), 'Info', {
        duration: 2000,
        politeness: 'assertive'
      });
    });
  }

  setVoted(label: String, tree: TreeStructure.TreeNodes) {
    this.files.forEach(node => {
      this.setVotedRecursive(node, tree);
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
        this.setVotedRecursive2(childNode, tree, 'node-font-black');
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

    if (node.children) {
      node.children.forEach(childNode => {
        this.setVotedRecursive(childNode, tree);
      });
    }
  }
}
