import { Component, Inject, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { Store } from '@ngrx/store'

import { STORAGE_CONFIG_KEY } from 'app/shared/constants'
import { RehydrateConfig } from 'app/shared/ngrx/config/config.actions'
import { RootState } from 'app/shared/ngrx/reducers'
import { WINDOW } from 'app/shared/services/window.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(WINDOW) private _window: Window,
    private _matIconRegistry: MatIconRegistry,
    private _store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this._matIconRegistry.setDefaultFontSetClass('material-icons-outlined')

    const persistedConfigStr = this._window.localStorage.getItem(STORAGE_CONFIG_KEY)
    const persistedConfig = persistedConfigStr ? JSON.parse(persistedConfigStr) : null
    if (persistedConfig) {
      this._store.dispatch(new RehydrateConfig(persistedConfig))
    }
  }
}
