import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewNodeDialogComponent } from './add-new-node-dialog.component';

describe('AddNewNodeDialogComponent', () => {
  let component: AddNewNodeDialogComponent;
  let fixture: ComponentFixture<AddNewNodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewNodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
