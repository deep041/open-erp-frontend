import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSelectComponent } from './organization-select.component';

describe('OrganizationSelectComponent', () => {
  let component: OrganizationSelectComponent;
  let fixture: ComponentFixture<OrganizationSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
