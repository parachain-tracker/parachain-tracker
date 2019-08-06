import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { HttpClientModule } from "@angular/common/http"
import { EnvModule } from "../environments/environment"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: "details/:id",
        loadChildren: "./details/details.module#DetailsModule",
    },
]

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, EnvModule, HttpClientModule, RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
