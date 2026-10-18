import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PollutionListComponent } from './components/pollution-list/pollution-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PollutionListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pollution');
}
