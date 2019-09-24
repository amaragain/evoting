import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteElectionComponent } from './delete-election.component';

describe('DeleteElectionComponent', () => {
  let component: DeleteElectionComponent;
  let fixture: ComponentFixture<DeleteElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
