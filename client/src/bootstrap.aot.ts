///<reference path="environment.d.ts"/>

import './styles';
import './polyfills';
import {enableProdMode} from '@angular/core';
import {ClientModuleNgFactory} from './aot/src/client.module.ngfactory';
import {platformBrowser} from '@angular/platform-browser';
declare const PRODUCTION: boolean;
if (PRODUCTION) {
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(ClientModuleNgFactory)
    .catch(err => console.error(err));
