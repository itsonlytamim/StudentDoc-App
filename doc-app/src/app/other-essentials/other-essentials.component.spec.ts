import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEssentialsComponent } from './other-essentials.component';

describe('OtherEssentialsComponent', () => {
  let component: OtherEssentialsComponent;
  let fixture: ComponentFixture<OtherEssentialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherEssentialsComponent]
    });
    fixture = TestBed.createComponent(OtherEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
