import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpShellComponent } from './erp-shell.component';

describe('ErpShellComponent', () => {
  let component: ErpShellComponent;
  let fixture: ComponentFixture<ErpShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErpShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
