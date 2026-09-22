import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render personajes via lista-personajes', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    req.flush({
      results: [
        { name: 'Rick Sanchez', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
        { name: 'Morty Smith', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
      ],
    });

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const names = Array.from(compiled.querySelectorAll('.tarjeta p')).map((el) =>
      el.textContent?.trim()
    );
    expect(names).toEqual(['Rick Sanchez', 'Morty Smith']);

    const images = Array.from(compiled.querySelectorAll('.tarjeta img')).map((img) =>
      img.getAttribute('src')
    );
    expect(images).toEqual([
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    ]);
  });
});