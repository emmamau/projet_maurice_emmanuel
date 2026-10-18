import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pollution } from '../models/pollution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private readonly http = inject(HttpClient);

  /**
   * Résout l'URL de l'API :
   * 1. Paramètre URL optionnel (?api=https://...)
   * 2. LocalStorage (si renseigné manuellement via le bouton modifier)
   * 3. Localhost en développement local
   * 4. environment.apiUrl configuré pour Render
   */
  getApiUrl(): string {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const apiParam = urlParams.get('api');
      if (apiParam) {
        return apiParam.replace(/\/+$/, '');
      }

      const stored = localStorage.getItem('POLLUTION_API_URL');
      if (stored && stored.trim() !== '') {
        return stored.trim().replace(/\/+$/, '');
      }

      const origin = window.location.origin;
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return 'http://localhost:3000/api';
      }
    }
    return environment.apiUrl.replace(/\/+$/, '');
  }

  setApiUrl(url: string): void {
    if (typeof window !== 'undefined') {
      const clean = url.trim().replace(/\/+$/, '');
      localStorage.setItem('POLLUTION_API_URL', clean);
      window.location.reload();
    }
  }

  /**
   * Effectue un GET pour récupérer la liste des pollutions.
   * Retourne un Observable de tableau de pollution.
   */
  getPollutions(): Observable<Pollution[]> {
    const url = `${this.getApiUrl()}/pollutions`;
    console.log(`[PollutionService] GET ${url}`);
    return this.http.get<Pollution[]>(url);
  }
}
