/* eslint-disable @typescript-eslint/ban-types */
import { InjectionToken } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

export const WINDOW = new InjectionToken('Window')

export abstract class WindowRef {
  get nativeWindow(): Window | object {
    throw new Error('Not implemented')
  }
}

export class BrowserWindowRef extends WindowRef {
  get nativeWindow(): Window | object {
    return window
  }
}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: object): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow
  }
  return new Object()
}
