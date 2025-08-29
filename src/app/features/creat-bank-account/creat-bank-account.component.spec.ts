import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatBankAccountComponent } from './creat-bank-account.component';

describe('CreatBankAccountComponent', () => {
  let component: CreatBankAccountComponent;
  let fixture: ComponentFixture<CreatBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
