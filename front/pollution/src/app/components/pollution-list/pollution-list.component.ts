import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { PollutionService } from '../../services/pollution.service';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-list.component.html',
  styleUrl: './pollution-list.component.css'
})
export class PollutionListComponent {
  private readonly pollutionService = inject(PollutionService);

  readonly apiUrl = this.pollutionService.getApiUrl();

  /**
   * Transformation de l'Observable en Signal Angular.
   */
  readonly pollutions = toSignal(
    this.pollutionService.getPollutions().pipe(
      catchError((err) => {
        console.error('[PollutionListComponent] Échec de l\'appel API :', err);
        return of([] as Pollution[]);
      })
    ),
    { initialValue: [] as Pollution[] }
  );

  /**
   * Permet de modifier facilement l'URL de l'API via une boîte de dialogue discrète.
   */
  editApiUrl(): void {
    const current = this.pollutionService.getApiUrl();
    const promptUrl = window.prompt(
      "URL de l'API Node.js backend (ex: https://pollution-api-xxxx.onrender.com/api) :",
      current
    );
    if (promptUrl && promptUrl.trim() !== '') {
      this.pollutionService.setApiUrl(promptUrl);
    }
  }
}
