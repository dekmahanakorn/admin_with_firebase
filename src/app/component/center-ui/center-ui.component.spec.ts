import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterUiComponent } from './center-ui.component';

describe('CenterUiComponent', () => {
  let component: CenterUiComponent;
  let fixture: ComponentFixture<CenterUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
