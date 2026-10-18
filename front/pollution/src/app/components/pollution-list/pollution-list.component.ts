import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
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
  // Injection du service de pollution
  private readonly pollutionService = inject(PollutionService);

  /**
   * Transformation de l'Observable en Signal Angular.
   * toSignal souscrit automatiquement au flux et met à jour le signal à chaque émission.
   */
  readonly pollutions = toSignal(this.pollutionService.getPollutions(), {
    initialValue: [] as Pollution[]
  });

  /**
   * Retourne une classe CSS stylisée en fonction du niveau de pollution.
   */
  getBadgeClass(valeur: number): string {
    if (valeur < 20) return 'badge-good';
    if (valeur < 40) return 'badge-moderate';
    return 'badge-alert';
  }

  /**
   * Retourne une appréciation textuelle pour l'indice de pollution.
   */
  getQualityLabel(valeur: number): string {
    if (valeur < 20) return 'Bonne';
    if (valeur < 40) return 'Modérée';
    return 'Dégradée / Alerte';
  }
}

