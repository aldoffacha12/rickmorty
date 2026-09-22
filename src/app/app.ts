import { Component } from '@angular/core';
import { ListaPersonajes } from './components/lista-personajes/lista-personajes';

@Component({
  selector: 'app-root',
  imports: [ListaPersonajes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}