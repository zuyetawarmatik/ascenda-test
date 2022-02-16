import { enableProdMode, LOCALE_ID } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic([{provide: LOCALE_ID, useValue: 'en-US'}])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err))
