import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { HttpClientModule } from "@angular/common/http"
import { EnvModule } from "../environments/environment"
import { RouterModule } from "@angular/router"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, EnvModule, HttpClientModule, RouterModule.forRoot([])],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
