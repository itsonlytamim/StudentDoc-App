import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterIdCardComponent } from './voter-id-card.component';

describe('VoterIdCardComponent', () => {
  let component: VoterIdCardComponent;
  let fixture: ComponentFixture<VoterIdCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterIdCardComponent]
    });
    fixture = TestBed.createComponent(VoterIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
