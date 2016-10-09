///<reference path="environment.d.ts"/>

import './styles';
import './polyfills';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ClientModule} from './client.module';
declare const PRODUCTION: boolean;
if (PRODUCTION) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ClientModule)
    .catch((err: any) => console.error(err));