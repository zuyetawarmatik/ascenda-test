import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { NgLetModule } from 'ng-let'

import { SharedModule } from 'app/shared/modules/shared.module'

import { HomeComponent } from './home.component'
import { HomeService } from './home.service'
import { HomeEffects } from './ngrx/home.effects'
import { homeReducer } from './ngrx/home.reducer'
import { PricePipe } from './pipes/price.pipe'
import { CurrencyFormatPipe } from './pipes/currency.pipe'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    PricePipe,
    CurrencyFormatPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    NgLetModule,
    SharedModule
  ],
  bootstrap: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
