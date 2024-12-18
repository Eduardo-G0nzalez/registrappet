import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importar el módulo para pruebas HTTP
import { QrService } from './qr.service'; // Importar el servicio que queremos probar

describe('QrService', () => {
  let service: QrService;
  let httpMock: HttpTestingController; 

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QrService],
    });

    service = TestBed.inject(QrService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debería generar QR exitosamente', () => {
    const mockResponse = new Blob();
    const attendanceId = '12345';


    service.generateQrCode(attendanceId).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(
      `https://api.qrserver.com/v1/create-qr-code/?data=${attendanceId}&size=150x150`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('Debería manejar error al generar QR', () => {
    const attendanceId = '12345';
    const mockError = 'Error generating QR code';

    service.generateQrCode(attendanceId).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.message).toBe(mockError);
      },
    });

    const req = httpMock.expectOne(
      `https://api.qrserver.com/v1/create-qr-code/?data=${attendanceId}&size=150x150`
    );
    expect(req.request.method).toBe('GET')
    req.error(new ErrorEvent('Network error'), { status: 500 });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
