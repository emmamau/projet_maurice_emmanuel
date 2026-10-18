import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { App } from './app';
import { PollutionService } from './services/pollution.service';

describe('App', () => {
  const mockPollutionService = {
    getApiUrl: () => 'http://localhost:3000/api',
    setApiUrl: () => {},
    getPollutions: () => of([
      { id: 1, ville: 'Paris', polluant: 'PM2.5', valeur: 28.5, date: '2026-10-18', description: 'Test' }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        { provide: PollutionService, useValue: mockPollutionService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render main title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain("Relevés de Pollution");
  });
});
