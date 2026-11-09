import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlaygroundComponent } from './table-playground.component';

describe('TablePlaygroundComponent', () => {
  let component: TablePlaygroundComponent;
  let fixture: ComponentFixture<TablePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
