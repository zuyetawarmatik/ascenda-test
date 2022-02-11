import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from 'app/shared/modules/shared.module'

import { homeReducer } from './ngrx/home.reducer'
import { HomeEffects } from './ngrx/home.effects'
import { HomeService } from './home.service'
import { HomeComponent } from './home.component'

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  bootstrap: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
