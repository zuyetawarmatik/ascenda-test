import { NgModule, PLATFORM_ID } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

import { environment } from 'src/environments/environment'
import { ApiInterceptor } from 'app/shared/interceptors/api.interceptor'
import { BrowserWindowRef, WINDOW, windowFactory, WindowRef } from 'app/shared/services/window.service'
import reducers from 'app/shared/ngrx/reducers'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Ascenda Test',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: WindowRef,
      useClass: BrowserWindowRef
    },
    {
      provide: WINDOW,
      useFactory: windowFactory,
      deps: [WindowRef, PLATFORM_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
