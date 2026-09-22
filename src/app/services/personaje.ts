import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Personaje } from '../models/personaje';

interface RespuestaApi {
  results: { name: string; image: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonajeService {
  private urlApi: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {
  }

  obtenerPersonajes(): Observable<Personaje[]> {
    return this.http.get<RespuestaApi>(this.urlApi).pipe(
      map((respuesta: RespuestaApi) =>
        respuesta.results.map((item: { name: string; image: string }) => ({
          name: item.name,
          image: item.image
        }))
      )
    );
  }
}