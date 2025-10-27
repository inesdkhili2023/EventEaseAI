import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDriverComponent } from './modify-driver.component';

describe('ModifyDriverComponent', () => {
  let component: ModifyDriverComponent;
  let fixture: ComponentFixture<ModifyDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
