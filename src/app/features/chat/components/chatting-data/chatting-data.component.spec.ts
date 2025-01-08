import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingDataComponent } from './chatting-data.component';

describe('ChattingDataComponent', () => {
  let component: ChattingDataComponent;
  let fixture: ComponentFixture<ChattingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChattingDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChattingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
