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
        path: "project/:id",
        loadChildren: "./project/project.module#ProjectModule",
    },
    {
        path: "collections/featured",
        loadChildren: "./collections/featured/featured.module#FeaturedModule",
    },
    {
        path: "collections",
        loadChildren: "./collections/collections.module#CollectionsModule",
    },
    {
        path: "rankings",
        loadChildren: "./rankings/rankings.module#RankingsModule",
    },
    {
        path: "**",
        redirectTo: "/",
    },
]

@NgModule({
    declarations: [AppComponent, LayoutComponent],
    imports: [BrowserModule, HttpClientModule, EnvModule, RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
