import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrPage } from './qr.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { QrService } from '../services/qr.service'; 

describe('QrPage', () => {
  let componente: QrPage;
  let fixture: ComponentFixture<QrPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
      ],
      declarations: [QrPage], 
      providers: [QrService] 
    }).compileComponents();  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPage);
    componente = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('debería ser creado', () => {
    expect(componente).toBeTruthy();
  });

});
