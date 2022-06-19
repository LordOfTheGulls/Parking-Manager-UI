import { Injectable } from "@angular/core";

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private readonly AppSettings;

    constructor(){
       this.AppSettings = environment;
    }

    public get ApiBaseURL() {
        return this.AppSettings.apiBaseURL;
    }
}