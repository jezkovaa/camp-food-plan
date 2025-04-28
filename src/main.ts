import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app/app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import localeSk from '@angular/common/locales/sk';
import { registerLocaleData } from '@angular/common';
import { CanDeactivateGuard } from './app/ui/services/can-deactivate.service';

registerLocaleData(localeSk);

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    CanDeactivateGuard,
    provideHttpClient(),
    provideRouter(routes),
    provideIonicAngular(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    { provide: LOCALE_ID, useValue: 'sk' } // Set Slovak locale
  ]
});
