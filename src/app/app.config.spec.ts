import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

describe('appConfig', () => {
  it('should be defined', () => {
    expect(appConfig).toBeDefined();
  });

  it('should contain the correct providers', () => {
    const expectedProviders = [
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient()
    ];

    // Verifica se os tipos dos provedores estão corretos
    expect(Array.isArray(appConfig.providers)).toBe(true);
    expect(appConfig.providers.length).toBe(expectedProviders.length);

    // Verifica se cada provider esperado está presente
    expectedProviders.forEach(expected => {
      const found = appConfig.providers.find(p => JSON.stringify(p) === JSON.stringify(expected));
      expect(found).toBeDefined();
    });
  });
});
