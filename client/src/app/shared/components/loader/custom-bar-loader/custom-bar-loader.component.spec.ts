import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBarLoaderComponent } from './custom-bar-loader.component';

describe('CustomBarLoaderComponent', () => {
  let component: CustomBarLoaderComponent;
  let fixture: ComponentFixture<CustomBarLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBarLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
