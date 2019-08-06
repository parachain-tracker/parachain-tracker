import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { HttpClientModule } from "@angular/common/http"
import { LayoutComponent } from "./layout/layout.component"
import { EnvModule } from "../environments/environment"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: "",
        loadChildren: "./home/home.module#HomeModule",
    },
    {
        path: "details/:id",
        loadChildren: "./details/details.module#DetailsModule",
    },
]

@NgModule({
    declarations: [AppComponent, LayoutComponent],
    imports: [BrowserModule, HttpClientModule, EnvModule, RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
