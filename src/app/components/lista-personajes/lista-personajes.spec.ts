import { TestBed } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';
import { Personaje } from '../../models/personaje';
import { PersonajeService } from '../../services/personaje';
import { ListaPersonajes } from './lista-personajes';

describe('ListaPersonajes', () => {
  it('should render personaje name and image', async () => {
    const personajes: Personaje[] = [
      { name: 'Rick Sanchez', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
      { name: 'Morty Smith', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
    ];
    const serviceStub = { obtenerPersonajes: () => of(personajes) };

    await TestBed.configureTestingModule({
      imports: [ListaPersonajes],
      providers: [{ provide: PersonajeService, useValue: serviceStub }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ListaPersonajes);
    fixture.detectChanges();
    await fixture.whenStable();
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

  it('should show loading message while loading', async () => {
    const serviceStub = { obtenerPersonajes: () => NEVER };

    await TestBed.configureTestingModule({
      imports: [ListaPersonajes],
      providers: [{ provide: PersonajeService, useValue: serviceStub }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ListaPersonajes);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loading = compiled.querySelector('p')?.textContent?.trim();
    expect(loading).toContain('cargando');
  });
});