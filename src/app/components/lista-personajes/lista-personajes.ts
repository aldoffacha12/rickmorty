import { Component, OnInit, inject, signal } from '@angular/core';
import { Personaje } from '../../models/personaje';
import { PersonajeService } from '../../services/personaje';

@Component({
  selector: 'app-lista-personajes',
  imports: [],
  templateUrl: './lista-personajes.html',
  styleUrl: './lista-personajes.scss',
})
export class ListaPersonajes implements OnInit {
  private servicio = inject(PersonajeService);
  personajes = signal<Personaje[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.servicio.obtenerPersonajes().subscribe({
      next: (personajes) => {
        this.personajes.set(personajes);
        this.cargando.set(false);
      },
    });
  }
}