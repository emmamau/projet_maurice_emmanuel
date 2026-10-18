import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pollution } from '../models/pollution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Effectue un appel HTTP GET vers l'API distante pour récupérer la liste des pollutions.
   * Retourne un Observable de tableau de Pollution : Observable<Pollution[]>
   */
  getPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(`${this.apiUrl}/pollutions`).pipe(
      catchError((error) => {
        console.warn('Impossible de joindre l\'API de pollution :', error?.message || error);
        return of([]);
      })
    );
  }
}

